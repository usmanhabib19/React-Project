import React from 'react'
import { Row, Col, Typography } from 'antd'

const { Title, Paragraph, Text } = Typography

const Hero = () => {
    return (
        <div>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Title level={1}>About</Title>
                        <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</Paragraph>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</Text>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Hero