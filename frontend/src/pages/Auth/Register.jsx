import React, { useState } from 'react'
import { Row, Col, Typography, Form, Input, Button, message, Card, Divider } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import GradientText from '../../components/GradientText'

const { Title, Text } = Typography

const Register = () => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const onFinish = (values) => {
        setLoading(true)
        try {
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
            const emailExists = existingUsers.some((user) => user.email === values.email)
            if (emailExists) {
                message.error('This email is already registered!')
                setLoading(false)
                return
            }

            const newUser = {
                id: Date.now(),
                name: values.name,
                email: values.email,
                phone: values.phone,
                password: values.password,
                createdAt: new Date().toISOString()
            }

            const updatedUsers = [...existingUsers, newUser]
            localStorage.setItem('users', JSON.stringify(updatedUsers))
            localStorage.setItem('currentUser', JSON.stringify({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone
            }))

            message.success(`Welcome, ${newUser.name}! Account created successfully.`)
            form.resetFields()
            setTimeout(() => { navigate('/auth/login') }, 1000)
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
                <div className="absolute bottom-[50%] right-[20%] w-[400px] h-[400px] bg-indigo-600/15 blur-[80px] rounded-full animate-pulse delay-700"></div>
            </div>

            <Row justify="center" align="middle" className="relative z-10 w-full px-6 py-12">
                <Col xs={23} sm={18} md={12} lg={10} xl={8}>
                    <div className="relative overflow-hidden p-8 md:p-12 rounded-[40px] bg-white/[0.02] backdrop-blur-[50px] border border-white/10 border-t-white/20 border-l-white/20 shadow-[0_40px_100px_rgba(0,0,0,0.6),inset_0_0_40px_rgba(255,255,255,0.02)] transition-all duration-500 hover:shadow-indigo-500/10">
                        {/* Noise Texture */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noiseFilter%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.8%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>

                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-8 bg-white/5 border border-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-400 drop-shadow-[0_0_8px_rgba(108,99,255,0.5)]">
                                <UserAddOutlined className="text-2xl" />
                            </div>
                            <Title level={2} style={{ color: '#fff', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                                <GradientText colors={["#60a5fa", "#a78bfa", "#60a5fa"]} animationSpeed={3}>
                                    Create Account
                                </GradientText>
                            </Title>
                            <Text className="text-white/60 text-sm md:text-base">Join us and start your journey</Text>
                        </div>

                        <Form onFinish={onFinish} form={form} layout="vertical" className="auth-form">
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="name"
                                        label={<span className="text-white/80 font-medium">Full Name</span>}
                                        rules={[{ required: true, message: 'Please enter your name!' }, { min: 2, message: 'Name must be at least 2 characters' }]}
                                    >
                                        <Input size="large" prefix={<UserOutlined className="text-white/40 mr-2" />} placeholder="John Doe" className="bg-white/5 border-white/10 rounded-2xl text-white py-3" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="phone"
                                        label={<span className="text-white/80 font-medium">Phone</span>}
                                        rules={[{ required: true, message: 'Please enter your phone!' }, { pattern: /^[0-9]{10}$/, message: 'Must be 10 digits' }]}
                                    >
                                        <Input size="large" prefix={<PhoneOutlined className="text-white/40 mr-2" />} placeholder="1234567890" maxLength={10} className="bg-white/5 border-white/10 rounded-2xl text-white py-3" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                name="email"
                                label={<span className="text-white/80 font-medium">Email Address</span>}
                                rules={[{ required: true, message: 'Please enter your email!' }, { type: 'email', message: 'Enter a valid email!' }]}
                            >
                                <Input size="large" prefix={<MailOutlined className="text-white/40 mr-2" />} placeholder="john@example.com" className="bg-white/5 border-white/10 rounded-2xl text-white py-3" />
                            </Form.Item>

                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="password"
                                        label={<span className="text-white/80 font-medium">Password</span>}
                                        rules={[{ required: true, message: 'Please create a password!' }, { min: 6, message: 'At least 6 characters' }]}
                                    >
                                        <Input.Password size="large" prefix={<LockOutlined className="text-white/40 mr-2" />} placeholder="Create password" className="bg-white/5 border-white/10 rounded-2xl text-white py-3" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="confirmPassword"
                                        label={<span className="text-white/80 font-medium">Confirm</span>}
                                        dependencies={['password']}
                                        rules={[{ required: true, message: 'Please confirm!' }, ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) return Promise.resolve()
                                                return Promise.reject(new Error('Mismatch!'))
                                            },
                                        })]}
                                    >
                                        <Input.Password size="large" prefix={<LockOutlined className="text-white/40 mr-2" />} placeholder="Confirm password" className="bg-white/5 border-white/10 rounded-2xl text-white py-3" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading}
                                className="h-[52px] mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 border-none rounded-2xl font-bold text-base tracking-wider uppercase shadow-[0_15px_30px_-10px_rgba(108,99,255,0.4)] hover:translate-y-[-2px] hover:shadow-[0_20px_40px_-10px_rgba(108,99,255,0.6)] active:scale-95 transition-all duration-300"
                            >
                                {loading ? 'Creating...' : 'Register Account'}
                            </Button>

                            <Divider className="border-white/10" />
                            <div className="text-center text-white/50 text-sm">
                                Already have an account?&nbsp;
                                <Link to="/auth/login" className="text-indigo-400 font-semibold hover:text-white transition-colors">
                                    Sign in here
                                </Link>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </main>
    )
}

export default Register