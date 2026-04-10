import React from 'react'
import { Row, Col, Typography } from 'antd'

const { Title } = Typography

const Login = () => {
    return (
        <main className='py-5'>
            <section className='container'>
                <div className=''>
                    <Row>
                        <Col span={24}>
                            <Title level={1} className='text-center'>Login</Title>
                        </Col>
                    </Row>
                </div>
            </section>
        </main>
    )
}

export default Login