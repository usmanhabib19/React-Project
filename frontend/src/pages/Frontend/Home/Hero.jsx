import React from 'react'
import { Row, Col, Typography, Button } from 'antd'
// import Ballpit from '../../../components/Ballpit'
import GridDistortion from '../../../components/Ballpits/GridDistortion'
import GradientText from '../../../components/GradientText'


const { Title, Paragraph } = Typography

const Hero = () => {
    return (
        <main style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden', background: '#000' }}>
            {/* Grid Distortion Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>

                <GridDistortion
                    imageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"
                    grid={10}
                    mouse={0.1}
                    strength={0.15}
                    relaxation={0.9}
                    className="custom-class"
                />
            </div>

            {/* Content Overlay */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                padding: '0 24px',
                background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
                pointerEvents: 'none' // Allow mouse to pass through to background
            }}>
                <Row justify="center" style={{ pointerEvents: 'auto' }}>
                    <Col xs={24} md={18} lg={14}>
                        <div style={{
                            padding: '4rem 2rem',
                            borderRadius: '24px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                            pointerEvents: 'auto' // Re-enable pointer events for the content card
                        }}>

                            <Title level={1} style={{
                                color: '#fff',
                                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                                fontWeight: 800,
                                marginBottom: '1.5rem',
                                letterSpacing: '-0.02em',
                                lineHeight: 1.1
                            }}>
                                Future of <GradientText
                                    colors={["#007CF0", "#00DFD8", "#007CF0"]}
                                    animationSpeed={10}
                                    showBorder={false}
                                >
                                    Innovation
                                </GradientText>
                            </Title>

                            <Paragraph style={{
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                                marginBottom: '3rem',
                                maxWidth: '600px',
                                margin: '0 auto 3rem auto'
                            }}>
                                Experience the next generation of web design with our cutting-edge platform.
                                Built for performance, designed for beauty.
                            </Paragraph>
                            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Button type="primary" size="large" style={{
                                    height: '56px',
                                    padding: '0 40px',
                                    fontSize: '1.1rem',
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    background: 'linear-gradient(90deg, #007CF0, #00DFD8)',
                                    border: 'none'
                                }}>
                                    Explore Now
                                </Button>
                                <Button size="large" ghost style={{
                                    height: '56px',
                                    padding: '0 40px',
                                    fontSize: '1.1rem',
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    borderColor: 'rgba(255,255,255,0.3)'
                                }}>
                                    View Documentation
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </main>

    )
}

export default Hero