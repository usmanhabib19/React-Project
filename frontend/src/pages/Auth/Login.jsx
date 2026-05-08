import React, { useState } from 'react'
import { Row, Col, Typography, Form, Input, Button, message, Card, Divider, Checkbox } from 'antd'
import { MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, LoginOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/Auth'
import GradientText from '../../components/GradientText'

const { Title, Text } = Typography

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const { dispatch } = useAuth()

    const onFinish = (values) => {
        setLoading(true)
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]')
            const matchedUser = users.find(
                (user) => user.email === values.email && user.password === values.password
            )

            if (!matchedUser) {
                message.error('Invalid email or password!')
                setLoading(false)
                return
            }

            const sessionUser = {
                id: matchedUser.id,
                name: matchedUser.name,
                email: matchedUser.email,
                phone: matchedUser.phone
            }

            if (values.remember) {
                localStorage.setItem('currentUser', JSON.stringify(sessionUser))
                localStorage.setItem('rememberMe', 'true')
            } else {
                sessionStorage.setItem('currentUser', JSON.stringify(sessionUser))
                localStorage.removeItem('rememberMe')
            }

            dispatch({ type: "LOGIN", payload: sessionUser })
            message.success(`Welcome back, ${matchedUser.name}!`)
            form.resetFields()
            setTimeout(() => { navigate('/') }, 1000)
        } catch (err) {
            message.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#050510]">
            {/* Premium Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(108,99,255,0.15)_0%,transparent_50%),radial-gradient(circle_at_100%_100%,rgba(139,92,246,0.15)_0%,transparent_50%),radial-gradient(circle_at_50%_50%,rgba(26,0,170,0.1)_0%,transparent_80%)]"></div>
                <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-purple-600/15 blur-[80px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-indigo-600/15 blur-[80px] rounded-full animate-pulse delay-700"></div>
            </div>

            <Row justify="center" align="middle" className="relative z-10 w-full px-6 py-12">
                <Col xs={23} sm={18} md={12} lg={10} xl={8}>
                    <div className="relative overflow-hidden p-8 md:p-12 rounded-[40px] bg-white/[0.02] backdrop-blur-[50px] border border-white/10 border-t-white/20 border-l-white/20 shadow-[0_40px_100px_rgba(0,0,0,0.6),inset_0_0_40px_rgba(255,255,255,0.02)] transition-all duration-500 hover:shadow-indigo-500/10">
                        {/* Noise Texture */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noiseFilter%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.8%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>

                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-8 bg-white/5 border border-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-400 drop-shadow-[0_0_8px_rgba(108,99,255,0.5)]">
                                <LoginOutlined className="text-2xl" />
                            </div>
                            <Title level={2} style={{ color: '#fff', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                                <GradientText colors={["#60a5fa", "#a78bfa", "#60a5fa"]} animationSpeed={3}>
                                    Welcome Back
                                </GradientText>
                            </Title>
                            <Text className="text-white/60 text-sm md:text-base">Sign in to continue your journey</Text>
                        </div>

                        {/* Form */}
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            size="large"
                            requiredMark={false}
                            initialValues={{ remember: true }}
                            className="auth-form"
                        >
                            <Form.Item
                                name="email"
                                label={<span className="text-white/80 font-medium">Email Address</span>}
                                rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Enter a valid email address' }]}
                            >
                                <Input 
                                    prefix={<MailOutlined className="text-white/40 mr-2" />} 
                                    placeholder="you@example.com"
                                    className="bg-white/5 border-white/10 rounded-2xl text-white py-3 hover:border-indigo-500/50 focus:border-indigo-500 focus:bg-white/10 transition-all shadow-inner"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label={
                                    <div className="w-full flex justify-between">
                                        <span className="text-white/80 font-medium">Password</span>
                                        <Link to="/forgot-password" hidden className="text-indigo-400 font-semibold hover:text-white transition-colors text-sm">
                                            Forgot password?
                                        </Link>
                                    </div>
                                }
                                rules={[{ required: true, message: 'Please enter your password' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="text-white/40 mr-2" />}
                                    placeholder="Enter your password"
                                    className="bg-white/5 border-white/10 rounded-2xl text-white py-3 hover:border-indigo-500/50 focus:border-indigo-500 focus:bg-white/10 transition-all shadow-inner"
                                    iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                                />
                            </Form.Item>

                            <div className="flex justify-between items-center mb-6">
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox className="text-white/60">Remember me</Checkbox>
                                </Form.Item>
                            </div>

                            <Form.Item className="mb-4">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    block
                                    className="h-[52px] bg-gradient-to-r from-indigo-500 to-purple-600 border-none rounded-2xl font-bold text-base tracking-wider uppercase shadow-[0_15px_30px_-10px_rgba(108,99,255,0.4)] hover:translate-y-[-2px] hover:shadow-[0_20px_40px_-10px_rgba(108,99,255,0.6)] active:scale-95 transition-all duration-300"
                                >
                                    {loading ? 'Signing in...' : 'Login Now'}
                                </Button>
                            </Form.Item>

                            <Divider className="border-white/10" />
                            <div className="text-center text-white/50 text-sm">
                                New here?&nbsp;
                                <Link to="/auth/register" className="text-indigo-400 font-semibold hover:text-white transition-colors">
                                    Create an account
                                </Link>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </main>
    )
}

export default Login