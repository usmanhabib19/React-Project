import React from 'react'
import { Row, Col, Typography } from 'antd'

const { Title } = Typography

const Register = () => {
    return (
        <main className='py-5'>
            <section className='container'>
                <div>
                    <Row>
                        <Col span={24}>
                            <Title level={1} className='text-center'>Register</Title>
                        </Col>
                    </Row>
                </div>
            </section>
        </main>
    )
}

export default Register