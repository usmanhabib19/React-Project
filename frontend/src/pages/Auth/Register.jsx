// Register.jsx

import React, { useState } from 'react'
import { Row, Col, Typography, Form, Input, Button, message, Card, Divider, Space } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import GradientText from '../../components/GradientText'

// CSS
import '../../scss/_auth.scss'

const { Title, Text } = Typography

const Register = () => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const onFinish = (values) => {
        setLoading(true)

        try {
            // Get existing users array from localStorage (or empty array)
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')

            // Check if email already registered
            const emailExists = existingUsers.some((user) => user.email === values.email)
            if (emailExists) {
                message.error('This email is already registered!')
                setLoading(false)
                return
            }

            // Build new user object (exclude confirmPassword)
            const newUser = {
                id: Date.now(),
                name: values.name,
                email: values.email,
                phone: values.phone,
                password: values.password, // In production: hash this!
                createdAt: new Date().toISOString()
            }

            // Save updated users list
            const updatedUsers = [...existingUsers, newUser]
            localStorage.setItem('users', JSON.stringify(updatedUsers))

            // Also save current logged-in user session
            localStorage.setItem('currentUser', JSON.stringify({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone
            }))

            message.success(`Welcome, ${newUser.name}! Account created successfully.`)
            form.resetFields()

            setTimeout(() => {
                navigate('/auth/login')
            }, 1000)

        } catch (err) {
            message.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="register-bg">
            <div className="premium-gradient-bg"></div>

            <Row justify="center" align="middle" style={{ minHeight: '100vh', width: '100%', position: 'relative', zIndex: 1, padding: '40px 0' }}>
                {/* Decorative Blobs */}
                <div className="auth-glow auth-glow-1"></div>
                <div className="auth-glow auth-glow-3"></div>

                <Col xs={23} sm={18} md={12} lg={10} xl={8}>

                    <Card className="register-card" bordered={false}>

                        <div className="register-header">
                            <div className="register-icon-circle">
                                <UserAddOutlined />
                            </div>
                            <Title level={2} className="register-title">
                                <GradientText colors={["#60a5fa", "#a78bfa", "#60a5fa"]} animationSpeed={3}>
                                    Create Account
                                </GradientText>
                            </Title>
                            <Text className="register-subtitle">Join us and start your journey</Text>
                        </div>

                        <Form className="register-form" onFinish={onFinish} form={form} layout="vertical">
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    {/* Name */}
                                    <Form.Item
                                        name="name"
                                        label="Full Name"
                                        rules={[
                                            { required: true, message: 'Please enter your name!' },
                                            { min: 2, message: 'Name must be at least 2 characters' }
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            placeholder="John Doe"
                                            prefix={<UserOutlined />}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    {/* Phone */}
                                    <Form.Item
                                        name="phone"
                                        label="Phone Number"
                                        rules={[
                                            { required: true, message: 'Please enter your phone number!' },
                                            { pattern: /^[0-9]{10}$/, message: 'Phone must be 10 digits' }
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            placeholder="1234567890"
                                            prefix={<PhoneOutlined />}
                                            maxLength={10}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            {/* Email */}
                            <Form.Item
                                name="email"
                                label="Email Address"
                                rules={[
                                    { required: true, message: 'Please enter your email!' },
                                    { type: 'email', message: 'Please enter a valid email!' }
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="john@example.com"
                                    prefix={<MailOutlined />}
                                />
                            </Form.Item>

                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    {/* Password */}
                                    <Form.Item
                                        name="password"
                                        label="Password"
                                        rules={[
                                            { required: true, message: 'Please create a password!' },
                                            { min: 6, message: 'At least 6 characters' }
                                        ]}
                                    >
                                        <Input.Password
                                            size="large"
                                            placeholder="Create password"
                                            prefix={<LockOutlined />}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    {/* Confirm Password */}
                                    <Form.Item
                                        name="confirmPassword"
                                        label="Confirm"
                                        dependencies={['password']}
                                        rules={[
                                            { required: true, message: 'Please confirm!' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve()
                                                    }
                                                    return Promise.reject(new Error('Mismatch!'))
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password
                                            size="large"
                                            placeholder="Confirm password"
                                            prefix={<LockOutlined />}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            {/* Submit Button */}
                            <Button className="register-btn" type="primary" htmlType="submit" block loading={loading} style={{ marginTop: 12 }}>
                                {loading ? 'Creating...' : 'Register Account'}
                            </Button>

                            <Divider className="register-divider" />

                            <div className="register-login-link" style={{ textAlign: 'center' }}>
                                <Text style={{ color: 'white' }}>Already have an account?&nbsp; </Text>
                                <Link to="/auth/login">Sign in here</Link>
                            </div>

                        </Form>
                    </Card>
                </Col>
            </Row>
        </main>
    )
}

export default Register