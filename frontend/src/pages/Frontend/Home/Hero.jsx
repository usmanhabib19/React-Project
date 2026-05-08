import React from 'react'
import Ballpit from '../../../components/Ballpits/Ballpit'
import GradientText from '../../../components/GradientText'

const Hero = () => {
    return (
        <main style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #05051a 0%, #0d0628 40%, #130a2e 100%)',
        }}>
            {/* Background Layer - Ballpit */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <Ballpit
                    count={100}
                    gravity={0.4}
                    friction={0.998}
                    wallBounce={0.9}
                    followCursor={true}
                    colors={[0x007CF0, 0x00DFD8, 0x7c3aed]}
                    ambientIntensity={1.2}
                    lightIntensity={250}
                    minSize={0.6}
                    maxSize={1.2}
                />
            </div>

            {/* Content Overlay */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                padding: '0 24px',
                pointerEvents: 'none',
            }}>
                <div style={{ pointerEvents: 'auto', width: '100%' }}>
                    {/* Glassmorphism Card */}
                    <div style={{
                        padding: '60px 48px',
                        borderRadius: '40px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.5), inset 0 0 40px rgba(255,255,255,0.02)',
                        maxWidth: '700px',
                        margin: '0 auto',
                    }}>
                        <h1 style={{
                            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                            fontWeight: 900,
                            color: '#ffffff',
                            margin: 0,
                            lineHeight: 1.1,
                            letterSpacing: '-0.03em',
                        }}>
                            Future of
                        </h1>

                        <div style={{ margin: '16px 0 32px' }}>
                            <GradientText
                                colors={["#007CF0", "#00DFD8", "#a855f7", "#007CF0"]}
                                animationSpeed={4}
                                showBorder={false}
                            >
                                <span style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.03em' }}>
                                    Innovation
                                </span>
                            </GradientText>
                        </div>

                        <p style={{
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                            lineHeight: 1.7,
                            maxWidth: '500px',
                            margin: '0 auto 40px',
                        }}>
                            Experience the next generation of web design with our cutting-edge platform.
                            Built for performance, designed for beauty.
                        </p>

                        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button style={{
                                height: '56px',
                                padding: '0 40px',
                                fontSize: '1rem',
                                fontWeight: 700,
                                borderRadius: '16px',
                                border: 'none',
                                cursor: 'pointer',
                                background: 'linear-gradient(90deg, #007CF0, #00DFD8)',
                                color: '#fff',
                                boxShadow: '0 8px 24px rgba(0,124,240,0.4)',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                letterSpacing: '0.02em',
                            }}
                            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 32px rgba(0,124,240,0.5)'; }}
                            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 24px rgba(0,124,240,0.4)'; }}
                            >
                                Explore Now
                            </button>
                            <button style={{
                                height: '56px',
                                padding: '0 40px',
                                fontSize: '1rem',
                                fontWeight: 700,
                                borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                cursor: 'pointer',
                                background: 'rgba(255,255,255,0.04)',
                                color: '#fff',
                                backdropFilter: 'blur(10px)',
                                transition: 'background 0.2s, border-color 0.2s',
                                letterSpacing: '0.02em',
                            }}
                            onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.08)'; e.target.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                            onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                            >
                                View Documentation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Hero