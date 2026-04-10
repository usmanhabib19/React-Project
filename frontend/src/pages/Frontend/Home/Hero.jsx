import React from 'react'
import { Row, Col, Typography } from 'antd'
import { Pagination } from 'antd'
const { Title, Paragraph, Text } = Typography

const Hero = () => {
    return (
        <div>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Title level={1}>Home</Title>
                        <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</Paragraph>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</Text>
                    </Col>
                </Row>
                <div className='d-flex justify-content-center align-items-center'>
                    <Pagination defaultCurrent={1} total={10} />;
                </div>
            </div>
        </div>
    )
}

export default Hero