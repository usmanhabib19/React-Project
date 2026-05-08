// Login.jsx
// Place in: src/pages/Auth/Login.jsx

import React, { useState } from 'react'
import { Row, Col, Typography, Form, Input, Button, message, Card, Divider, Checkbox } from 'antd'
import { MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, LoginOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/Auth'
import GradientText from '../../components/GradientText'
import '../../scss/_auth.scss'

const { Title, Text } = Typography

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const { dispatch } = useAuth()


    const onFinish = (values) => {
        setLoading(true)

        try {
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]')

            // Find matching user by email and password
            const matchedUser = users.find(
                (user) =>
                    user.email === values.email &&
                    user.password === values.password
            )

            if (!matchedUser) {
                message.error('Invalid email or password!')
                setLoading(false)
                return
            }

            // Save session
            const sessionUser = {
                id: matchedUser.id,
                name: matchedUser.name,
                email: matchedUser.email,
                phone: matchedUser.phone
            }

            if (values.remember) {
                // Remember me — persist in localStorage
                localStorage.setItem('currentUser', JSON.stringify(sessionUser))
                localStorage.setItem('rememberMe', 'true')
            } else {
                // Session only — use sessionStorage
                sessionStorage.setItem('currentUser', JSON.stringify(sessionUser))
                localStorage.removeItem('rememberMe')
            }

            dispatch({ type: "LOGIN", payload: sessionUser })


            message.success(`Welcome back, ${matchedUser.name}!`)
            form.resetFields()

            setTimeout(() => {
                navigate('/') // change to your route
            }, 1000)

        } catch (err) {
            message.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="login-bg">
            <div className="premium-gradient-bg"></div>

            <Row justify="center" align="middle" style={{ minHeight: '100vh', width: '100%', position: 'relative', zIndex: 1, padding: '24px 0' }}>
                {/* Decorative Blobs */}
                <div className="auth-glow auth-glow-1"></div>
                <div className="auth-glow auth-glow-2"></div>

                <Col xs={23} sm={18} md={12} lg={10} xl={8}>

                    <Card className="login-card" bordered={false}>

                        {/* Header */}
                        <div className="login-header">
                            <div className="login-icon-circle">
                                <LoginOutlined />
                            </div>
                            <Title level={2} className="login-title">
                                <GradientText colors={["#60a5fa", "#a78bfa", "#60a5fa"]} animationSpeed={3}>
                                    Welcome Back
                                </GradientText>
                            </Title>
                            <Text className="login-subtitle">Sign in to continue your journey</Text>
                        </div>

                        {/* Form */}
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            size="large"
                            requiredMark={false}
                            className="login-form"
                            initialValues={{ remember: true }}
                        >

                            {/* Email */}
                            <Form.Item
                                name="email"
                                label="Email Address"
                                rules={[
                                    { required: true, message: 'Please enter your email' },
                                    { type: 'email', message: 'Enter a valid email address' }
                                ]}
                            >
                                <Input
                                    prefix={<MailOutlined />}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                />
                            </Form.Item>

                            {/* Password */}
                            <Form.Item
                                name="password"
                                label={
                                    <span style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        Password
                                        <Link to="/forgot-password" className="login-forgot">
                                            Forgot password?
                                        </Link>
                                    </span>
                                }
                                rules={[
                                    { required: true, message: 'Please enter your password' }
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    iconRender={(visible) =>
                                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                    }
                                />
                            </Form.Item>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                            </div>

                            {/* Submit */}
                            <Form.Item style={{ marginBottom: 16 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    block
                                    className="login-btn"
                                >
                                    {loading ? 'Signing in...' : 'Login Now'}
                                </Button>
                            </Form.Item>

                            {/* Register Link */}
                            <Divider className="login-divider" />
                            <div className="login-register-link" style={{ textAlign: 'center' }}>
                                <Text style={{ color: 'white' }}>New here?&nbsp;</Text>
                                <Link to="/auth/register">  Create an account</Link>
                            </div>

                        </Form>
                    </Card>

                </Col>
            </Row>
        </main>
    )
}

export default Login