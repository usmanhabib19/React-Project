import React from 'react'
import { Row, Col, Typography } from 'antd'
import { Pagination } from 'antd'
const { Title, Paragraph, Text } = Typography

const Hero = () => {
    return (
        <main className="h-100vh">
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Title level={1}>Home</Title>
                        <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</Paragraph>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</Text>
                    </Col>
                </Row>
                <div className='pt-5 d-flex justify-content-center align-items-center'>
                    <Pagination defaultCurrent={1} total={50} />;
                </div>
            </div>
        </main>
    )
}

export default Hero