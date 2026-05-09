import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Typography, Space } from 'antd'

const { Title, Text } = Typography

const ResetPassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({ password: '', confirmPassword: '' })
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const getStrength = (pass) => {
        if (pass.length === 0) return null
        if (pass.length < 6) return { label: 'Weak', bars: 1, color: 'bg-red-500' }
        if (pass.length < 10) return { label: 'Medium', bars: 2, color: 'bg-yellow-500' }
        if (pass.length < 14) return { label: 'Strong', bars: 3, color: 'bg-green-500' }
        return { label: 'Very Strong', bars: 4, color: 'bg-violet-500' }
    }

    const strength = getStrength(formData.password)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            window.toastify('Passwords do not match', 'error')
            return
        }
        if (formData.password.length < 6) {
            window.toastify('Password must be at least 6 characters', 'error')
            return
        }

        setLoading(true)
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]')
            const userIndex = users.findIndex(u => u.email === token)

            if (userIndex === -1) {
                window.toastify('User not found! Please check the email.', 'error')
                setLoading(false)
                return
            }

            users[userIndex].password = formData.password
            localStorage.setItem('users', JSON.stringify(users))

            window.toastify('Password reset successful!', 'success')
            navigate('/auth/login')
        } catch (err) {
            window.toastify(err?.message || 'Something went wrong', 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4 relative overflow-hidden">

            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md bg-white/4 border border-white/8 rounded-2xl p-10 backdrop-blur-xl shadow-2xl">

                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="text-2xl text-violet-400 animate-spin" style={{ animationDuration: '6s' }}>✦</span>
                    <span className="text-xl font-bold tracking-widest bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
                        REACT
                    </span>
                </div>

                {/* Heading */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-1">Reset Password</h2>
                    <p className="text-white/50 text-sm">Enter your new password below</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* New Password */}
                    <div>
                        <label className="block text-white/70 text-sm font-medium mb-2">
                            New Password
                        </label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-sm pointer-events-none">🔒</span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter new password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/6 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-violet-500/60 focus:bg-white/8 focus:ring-2 focus:ring-violet-500/20 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 text-white/40 hover:text-white/70 transition-colors cursor-pointer bg-transparent border-none"
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-white/70 text-sm font-medium mb-2">
                            Confirm Password
                        </label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-sm pointer-events-none">🔒</span>
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/6 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-violet-500/60 focus:bg-white/8 focus:ring-2 focus:ring-violet-500/20 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 text-white/40 hover:text-white/70 transition-colors cursor-pointer bg-transparent border-none"
                            >
                                {showConfirm ? '🙈' : '👁️'}
                            </button>
                        </div>

                        {/* Match indicator */}
                        {formData.confirmPassword && (
                            <p className={`text-xs mt-1 ${formData.password === formData.confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
                                {formData.password === formData.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                            </p>
                        )}
                    </div>

                    {/* Password Strength */}
                    {strength && (
                        <div className="space-y-1">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((bar) => (
                                    <div
                                        key={bar}
                                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${bar <= strength.bars ? strength.color : 'bg-white/10'
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-white/40">{strength.label}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl font-semibold text-white text-sm tracking-wide bg-gradient-to-r from-indigo-500 to-violet-500 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer border-none mt-2"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Resetting...
                            </span>
                        ) : 'Reset Password'}
                    </button>

                </form>

                {/* Footer */}
                <div className="text-center mt-6">
                    <span className="text-white/40 text-sm">Remember your password? </span>
                    <Link
                        to="/auth/login"
                        className="text-violet-400 text-sm font-medium hover:text-violet-300 transition-colors no-underline"
                    >
                        Login
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default ResetPassword