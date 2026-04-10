import { Row, Col, Typography } from 'antd'

const { Title, Paragraph } = Typography

const PageNotFound = () => {
    return (
        <main className='py-5'>
            <section className='container'>
                <div className=''>
                    <Row>
                        <Col span={24}>
                            <Title level={1} className='text-center'>404</Title>
                            <Paragraph className='text-center'>Page Not Found</Paragraph>
                        </Col>
                    </Row>
                </div>
            </section>
        </main>
    )
}

export default PageNotFound