// Login.jsx
// Place in: src/pages/Auth/Login.jsx

import React, { useState } from 'react'
import { Row, Col, Typography, Form, Input, Button, message, Card, Divider, Checkbox } from 'antd'
import { MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, LoginOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const navigate = useNavigate()

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

            message.success(`Welcome back, ${matchedUser.name}!`)
            form.resetFields()

            setTimeout(() => {
                navigate('/dashboard') // change to your route
            }, 1000)

        } catch (err) {
            message.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="login-bg">
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col xs={23} sm={18} md={14} lg={10} xl={8}>

                    <Card className="login-card" bordered={false}>

                        {/* Header */}
                        <div className="login-header">
                            <div className="login-icon-circle">
                                <LoginOutlined />
                            </div>
                            <Title level={3} className="login-title">Welcome Back</Title>
                            <Text className="login-subtitle">Sign in to your account</Text>
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

                            {/* Remember Me */}
                            <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: 20 }}>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            {/* Submit */}
                            <Form.Item style={{ marginBottom: 8 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    block
                                    className="login-btn"
                                >
                                    {loading ? 'Signing in...' : 'Login'}
                                </Button>
                            </Form.Item>

                            {/* Register Link */}
                            <Divider className="login-divider" />
                            <div className="login-register-link">
                                <Text type="secondary">Don't have an account? </Text>
                                <Link to="/auth/register">Create one here</Link>
                            </div>

                        </Form>
                    </Card>

                </Col>
            </Row>
        </main>
    )
}

export default Login