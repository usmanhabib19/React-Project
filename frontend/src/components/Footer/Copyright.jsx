import React from 'react'
import { Row, Col, Typography } from 'antd'

const { Paragraph } = Typography

const Copyright = () => {
    const year = new Date().getFullYear()
    return (
        <footer className="bg-secondary py-3">
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Paragraph className='mb-0 text-white text-center'>Copyright &copy; {year} All rights reserved.</Paragraph>
                    </Col>
                </Row>
            </div>
        </footer>
    )
}

export default Copyright