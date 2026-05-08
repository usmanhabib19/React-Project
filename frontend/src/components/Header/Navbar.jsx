import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Space, Typography } from 'antd'
import { animate, stagger, splitText } from 'animejs'
import { useAuth } from '../../context/Auth'
import '../../scss/_navbar.scss'

const { Text } = Typography

const Navbar = () => {
    const { isAuth, user, dispatch } = useAuth()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
        localStorage.removeItem('user')
        window.toastify('Logout successful', 'success')
    }

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Animejs logo animation — same as your original
    useEffect(() => {
        const { chars } = splitText('.navbar-brand', { words: false, chars: true })
        animate(chars, {
            y: [{ to: 0, ease: 'outExpo', duration: 600 }, { to: 0, ease: 'outBounce', duration: 800, delay: 100 }],
            rotate: { from: '-1turn', delay: 0 },
            delay: stagger(50),
            ease: 'inOutCirc',
            loopDelay: 1000,
            loop: true,
        })
    }, [])

    // Animate nav links on mount
    useEffect(() => {
        animate('.nav-link-item', {
            opacity: [0, 1],
            y: [-20, 0],
            delay: stagger(80, { start: 300 }),
            duration: 600,
            ease: 'outExpo',
        })
    }, [])

    return (
        <nav className={`navbar navbar-expand-lg navbar-dark shadow-sm custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="container">

                {/* Logo — same class as your original so animejs works */}
                <Link className="navbar-brand fw-bold" to="/">REACT</Link>

                {/* Bootstrap toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Nav Links — same structure as yours */}
                <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item nav-link-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>

                        <li className="nav-item nav-link-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>

                        <li className="nav-item nav-link-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>

                        {/* Dropdown — same as yours */}
                        <li className="nav-item dropdown nav-link-item">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Hooks
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/hooks/useState">useState</Link></li>
                                <li><Link className="dropdown-item" to="/hooks/useEffect">useEffect</Link></li>
                                <li><Link className="dropdown-item" to="/hooks/useContext">useContext</Link></li>
                                <li><Link className="dropdown-item" to="/hooks/useRef">useRef</Link></li>
                                <li><Link className="dropdown-item" to="/hooks/useReducer">useReducer</Link></li>
                            </ul>
                        </li>

                    </ul>

                    {/* Auth section — same as yours */}
                    <div className="d-flex">
                        <Space size="small">
                            {isAuth ? (
                                <>
                                    <Text className="text-white">Welcome! {user.name}</Text>
                                    <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/auth/login" className="btn btn-success btn-sm">Login</Link>
                                    <Link to="/auth/register" className="btn btn-info btn-sm">Register</Link>
                                </>
                            )}
                        </Space>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar