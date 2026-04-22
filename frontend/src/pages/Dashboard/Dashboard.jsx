// Dashboard.jsx
// Place in: src/pages/Dashboard/Dashboard.jsx

import React, { useState, useEffect } from 'react'
import { Layout, Menu, Typography, Row, Col, Card, Table, Tag, Avatar, Button, Badge, Progress, Statistic, Breadcrumb, Dropdown, Space, Divider, List } from 'antd'
import { DashboardOutlined, UserOutlined, BookOutlined, TeamOutlined, BarChartOutlined, SettingOutlined, LogoutOutlined, BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined, RiseOutlined, FallOutlined, TrophyOutlined, CalendarOutlined, FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, ReadOutlined, SolutionOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import '../../scss/_dashboard.scss'

const { Sider, Header, Content } = Layout
const { Title, Text } = Typography

// ── Mock Data ──
const studentsData = [
    { key: '1', name: 'Ali Hassan', subject: 'Mathematics', grade: 'A+', attendance: 95, status: 'Active' },
    { key: '2', name: 'Sara Khan', subject: 'Physics', grade: 'A', attendance: 88, status: 'Active' },
    { key: '3', name: 'Usman Malik', subject: 'Chemistry', grade: 'B+', attendance: 76, status: 'On Leave' },
    { key: '4', name: 'Fatima Noor', subject: 'Biology', grade: 'A+', attendance: 98, status: 'Active' },
    { key: '5', name: 'Bilal Ahmed', subject: 'English', grade: 'B', attendance: 65, status: 'Warning' },
    { key: '6', name: 'Zara Sheikh', subject: 'Computer', grade: 'A', attendance: 91, status: 'Active' },
    { key: '7', name: 'Hassan Raza', subject: 'Urdu', grade: 'B+', attendance: 80, status: 'Active' },
]

const recentActivities = [
    { icon: <CheckCircleOutlined style={{ color: '#27ae60' }} />, text: 'Ali Hassan submitted Math assignment', time: '2 min ago' },
    { icon: <ClockCircleOutlined style={{ color: '#f39c12' }} />, text: 'Physics exam scheduled for tomorrow', time: '1 hr ago' },
    { icon: <UserOutlined style={{ color: '#0288d1' }} />, text: 'New student Zara Sheikh enrolled', time: '3 hr ago' },
    { icon: <CloseCircleOutlined style={{ color: '#e74c3c' }} />, text: 'Bilal Ahmed marked absent', time: '5 hr ago' },
    { icon: <TrophyOutlined style={{ color: '#f39c12' }} />, text: 'Fatima Noor topped monthly test', time: 'Yesterday' },
]

const subjectProgress = [
    { subject: 'Mathematics', progress: 85, color: '#0288d1' },
    { subject: 'Physics', progress: 72, color: '#27ae60' },
    { subject: 'Chemistry', progress: 68, color: '#f39c12' },
    { subject: 'Biology', progress: 90, color: '#9b59b6' },
    { subject: 'Computer', progress: 78, color: '#e74c3c' },
]

const columns = [
    {
        title: 'Student',
        dataIndex: 'name',
        key: 'name',
        render: (name) => (
            <Space>
                <Avatar
                    style={{ background: 'linear-gradient(135deg, #2C5364, #4fc3f7)', fontSize: 13 }}
                    size={32}
                >
                    {name.charAt(0)}
                </Avatar>
                <Text strong style={{ fontSize: 13 }}>{name}</Text>
            </Space>
        )
    },
    { title: 'Subject', dataIndex: 'subject', key: 'subject', render: (v) => <Text style={{ fontSize: 13 }}>{v}</Text> },
    {
        title: 'Grade',
        dataIndex: 'grade',
        key: 'grade',
        render: (g) => (
            <span style={{
                background: g.startsWith('A') ? '#e6f9f0' : g.startsWith('B') ? '#e3f2fd' : '#fff8e1',
                color: g.startsWith('A') ? '#27ae60' : g.startsWith('B') ? '#0288d1' : '#f39c12',
                borderRadius: 6, padding: '2px 10px', fontWeight: 700, fontSize: 12
            }}>{g}</span>
        )
    },
    {
        title: 'Attendance',
        dataIndex: 'attendance',
        key: 'attendance',
        render: (v) => (
            <Space direction="vertical" size={0} style={{ width: 90 }}>
                <Text style={{ fontSize: 12, fontWeight: 600 }}>{v}%</Text>
                <Progress
                    percent={v}
                    size="small"
                    showInfo={false}
                    strokeColor={v >= 85 ? '#27ae60' : v >= 75 ? '#f39c12' : '#e74c3c'}
                    trailColor="#f0f0f0"
                    style={{ margin: 0 }}
                />
            </Space>
        )
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (s) => {
            const map = {
                'Active': 'badge-success',
                'On Leave': 'badge-info',
                'Warning': 'badge-danger',
            }
            return <span className={map[s] || 'badge-info'}>{s}</span>
        }
    }
]

// ── Component ──
const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [selectedKey, setSelectedKey] = useState('dashboard')
    const [currentUser, setCurrentUser] = useState(null)
    const [students, setStudents] = useState([])
    const [userCount, setUserCount] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        // Read user from localStorage or sessionStorage
        const user =
            JSON.parse(localStorage.getItem('currentUser') || 'null') ||
            JSON.parse(sessionStorage.getItem('currentUser') || 'null')
        if (user) setCurrentUser(user)

        // ── All registered users from localStorage ──
        const allUsers = JSON.parse(localStorage.getItem('users') || '[]')
        setUserCount(allUsers.length)

        // ── Map users to student table format ──
        const mapped = allUsers.map((u, i) => ({
            key: String(i + 1),
            name: u.name,
            email: u.email,
            phone: u.phone,
            grade: 'N/A',
            subject: 'N/A',
            attendance: 100,
            status: 'Active',
            createdAt: u.createdAt
                ? new Date(u.createdAt).toLocaleDateString()
                : 'N/A'
        }))
        setStudents(mapped)

    }, [])

    const handleLogout = () => {
        localStorage.removeItem('currentUser')
        sessionStorage.removeItem('currentUser')
        navigate('/auth/login')
    }

    const menuItems = [
        { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
        { key: 'students', icon: <TeamOutlined />, label: 'Students' },
        { key: 'courses', icon: <BookOutlined />, label: 'Courses' },
        { key: 'exams', icon: <SolutionOutlined />, label: 'Exams' },
        { key: 'results', icon: <TrophyOutlined />, label: 'Results' },
        { key: 'schedule', icon: <CalendarOutlined />, label: 'Schedule' },
        { key: 'reports', icon: <BarChartOutlined />, label: 'Reports' },
        { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
    ]

    const statCards = [
        { label: 'Total Students', value: 1240, change: '+12%', up: true, bg: '#e3f2fd', iconBg: '#0288d1', icon: <TeamOutlined style={{ color: '#fff' }} /> },
        { label: 'Total Courses', value: 24, change: '+3%', up: true, bg: '#e8f5e9', iconBg: '#27ae60', icon: <BookOutlined style={{ color: '#fff' }} /> },
        { label: 'Exams Today', value: 5, change: '0%', up: null, bg: '#fff8e1', iconBg: '#f39c12', icon: <FileTextOutlined style={{ color: '#fff' }} /> },
        { label: 'Avg Attendance', value: '84%', change: '-2%', up: false, bg: '#fce4ec', iconBg: '#e74c3c', icon: <ReadOutlined style={{ color: '#fff' }} /> },
    ]

    return (
        <Layout className="dashboard-layout">

            {/* ── Sidebar ── */}
            <Sider
                className="dashboard-sider"
                collapsed={collapsed}
                width={220}
                collapsedWidth={80}
                trigger={null}
            >
                {/* Logo */}
                <div className="dashboard-logo">
                    <div className="dashboard-logo-icon">
                        <ReadOutlined />
                    </div>
                    {!collapsed && <Title className="dashboard-logo-text">EduPanel</Title>}
                </div>

                {/* User Profile */}
                {!collapsed && (
                    <div className="sidebar-profile">
                        <div className="sidebar-profile-avatar">
                            {currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <Title className="sidebar-profile-name">{currentUser?.name || 'User'}</Title>
                            <Text className="sidebar-profile-email">{currentUser?.email || ''}</Text>
                        </div>
                    </div>
                )}

                {/* Menu */}
                <Menu
                    className="dashboard-menu"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onSelect={({ key }) => setSelectedKey(key)}
                    items={menuItems}
                />

                {/* Logout */}
                <div className="sidebar-logout">
                    <Button
                        className="sidebar-logout-btn"
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                    >
                        {!collapsed && 'Logout'}
                    </Button>
                </div>
            </Sider>

            {/* ── Main ── */}
            <Layout className={`dashboard-main-layout ${collapsed ? 'dashboard-main-layout-collapsed' : ''}`}>

                {/* Header */}
                <Header className="dashboard-header">
                    <div className="dashboard-header-left">
                        <button
                            className="header-icon-btn"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </button>
                        <Title className="dashboard-header-title">
                            {menuItems.find(m => m.key === selectedKey)?.label || 'Dashboard'}
                        </Title>
                    </div>
                    <div className="dashboard-header-right">
                        <Badge count={3} size="small">
                            <button className="header-icon-btn"><BellOutlined /></button>
                        </Badge>
                        <Avatar
                            style={{ background: 'linear-gradient(135deg, #2C5364, #4fc3f7)', cursor: 'pointer' }}
                            size={36}
                        >
                            {currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </Avatar>
                    </div>
                </Header>

                {/* Content */}
                <Content className="dashboard-content">

                    {/* Breadcrumb */}
                    <Breadcrumb
                        style={{ marginBottom: 20 }}
                        items={[
                            { title: 'Home' },
                            { title: menuItems.find(m => m.key === selectedKey)?.label }
                        ]}
                    />

                    {/* Stat Cards */}
                    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                        {statCards.map((s, i) => (
                            <Col xs={24} sm={12} lg={6} key={i}>
                                <Card className="stat-card" style={{ background: s.bg }}>
                                    <Row justify="space-between" align="top">
                                        <Col>
                                            <Text className="stat-card-label">{s.label}</Text>
                                            <Title className="stat-card-value">{s.value}</Title>
                                            {s.up !== null && (
                                                <div className="stat-card-change" style={{ color: s.up ? '#27ae60' : '#e74c3c' }}>
                                                    {s.up ? <RiseOutlined /> : <FallOutlined />} {s.change} this month
                                                </div>
                                            )}
                                        </Col>
                                        <div className="stat-card-icon" style={{ background: s.iconBg }}>
                                            {s.icon}
                                        </div>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Students Table + Activity */}
                    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                        <Col xs={24} lg={16}>
                            <Card
                                className="section-card"
                                title="Recent Students"
                                extra={<Button type="link" style={{ color: '#2C5364', fontWeight: 600 }}>View All</Button>}
                            >
                                <Table
                                    className="dashboard-table"
                                    dataSource={studentsData}
                                    columns={columns}
                                    pagination={false}
                                    size="small"
                                    scroll={{ x: 500 }}
                                />
                            </Card>
                        </Col>

                        <Col xs={24} lg={8}>
                            <Card className="section-card" title="Recent Activity" style={{ height: '100%' }}>
                                <List
                                    dataSource={recentActivities}
                                    renderItem={(item) => (
                                        <List.Item style={{ padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}>
                                            <Space align="start">
                                                <div style={{ fontSize: 18, marginTop: 2 }}>{item.icon}</div>
                                                <div>
                                                    <Text style={{ fontSize: 13, display: 'block', lineHeight: 1.4 }}>{item.text}</Text>
                                                    <Text type="secondary" style={{ fontSize: 11 }}>{item.time}</Text>
                                                </div>
                                            </Space>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                    </Row>

                    {/* Subject Progress */}
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Card className="section-card" title="Subject Performance">
                                {subjectProgress.map((s, i) => (
                                    <div key={i} style={{ marginBottom: 16 }}>
                                        <Row justify="space-between" style={{ marginBottom: 4 }}>
                                            <Text style={{ fontSize: 13, fontWeight: 500 }}>{s.subject}</Text>
                                            <Text style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.progress}%</Text>
                                        </Row>
                                        <Progress
                                            percent={s.progress}
                                            showInfo={false}
                                            strokeColor={s.color}
                                            trailColor="#f0f0f0"
                                            strokeWidth={8}
                                            style={{ margin: 0 }}
                                        />
                                    </div>
                                ))}
                            </Card>
                        </Col>

                        <Col xs={24} md={12}>
                            <Card className="section-card" title="Quick Stats">
                                <Row gutter={[16, 16]}>
                                    {[
                                        { label: 'Pass Rate', value: '91%', color: '#27ae60' },
                                        { label: 'Fail Rate', value: '9%', color: '#e74c3c' },
                                        { label: 'Top Performers', value: '48', color: '#0288d1' },
                                        { label: 'Assignments Due', value: '12', color: '#f39c12' },
                                        { label: 'Teachers', value: '36', color: '#9b59b6' },
                                        { label: 'Classes Today', value: '8', color: '#2C5364' },
                                    ].map((q, i) => (
                                        <Col xs={12} key={i}>
                                            <Card
                                                size="small"
                                                style={{
                                                    borderRadius: 10,
                                                    border: `1.5px solid ${q.color}22`,
                                                    background: `${q.color}11`,
                                                    textAlign: 'center'
                                                }}
                                            >
                                                <Title level={3} style={{ color: q.color, margin: 0 }}>{q.value}</Title>
                                                <Text style={{ fontSize: 12, color: '#555' }}>{q.label}</Text>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                </Content>
            </Layout>
        </Layout>
    )
}

export default Dashboard