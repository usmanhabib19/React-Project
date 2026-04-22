// Register.jsx

import React, { useState } from 'react'
import { Row, Col, Typography, Form, Input, Button, message, Card, Divider, Space } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

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
                navigate('/login')
            }, 1000)

        } catch (err) {
            message.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="register-bg">
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col xs={23} sm={18} md={14} lg={10} xl={8}>

                    <Card className="register-card" bordered={false}>

                        <div className="register-header">
                            <div className="register-icon-circle">
                                <UserAddOutlined />
                            </div>
                            <Title level={3} className="register-title">Create Account</Title>
                            <Text className="register-subtitle">Register to get started</Text>
                        </div>

                        <Form className="register-form" onFinish={onFinish} form={form}>
                            {/* Name */}
                            <Form.Item
                                name="name"
                                rules={[
                                    { required: true, message: 'Please enter your name!' },
                                    { min: 2, message: 'Name must be at least 2 characters' },
                                    { max: 50, message: 'Name must not exceed 50 characters' },
                                    { pattern: /^[A-Za-z\s]+$/, message: 'Name can only contain letters and spaces' }
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Full Name"
                                    prefix={<UserOutlined />}
                                />
                            </Form.Item>

                            {/* Email */}
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: 'Please enter your email!' },
                                    { type: 'email', message: 'Please enter a valid email!' },
                                    { max: 100, message: 'Email must not exceed 100 characters' }
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Email Address"
                                    prefix={<MailOutlined />}
                                />
                            </Form.Item>

                            {/* Phone */}
                            <Form.Item
                                name="phone"
                                rules={[
                                    { required: true, message: 'Please enter your phone number!' },
                                    { pattern: /^[0-9]{10}$/, message: 'Phone must be 10 digits' }
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Phone Number"
                                    prefix={<PhoneOutlined />}
                                    maxLength={10}
                                />
                            </Form.Item>

                            {/* Password */}
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: 'Please create a password!' },
                                    { min: 6, message: 'Password must be at least 6 characters' },
                                    { max: 32, message: 'Password must not exceed 32 characters' }
                                ]}
                            >
                                <Input.Password
                                    size="large"
                                    placeholder="Password"
                                    prefix={<LockOutlined />}
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>

                            {/* Confirm Password */}
                            <Form.Item
                                name="confirmPassword"
                                dependencies={['password']}
                                rules={[
                                    { required: true, message: 'Please confirm your password!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(new Error('Passwords do not match!'))
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    size="large"
                                    placeholder="Confirm Password"
                                    prefix={<LockOutlined />}
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>

                            {/* Submit Button */}
                            <Button className="register-btn" type="primary" htmlType="submit" block loading={loading}>
                                {loading ? 'Creating...' : 'Register'}
                            </Button>

                            <Divider className="register-divider" />

                            <div className="register-login-link">
                                <Text type="secondary">Already have an account? </Text>
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