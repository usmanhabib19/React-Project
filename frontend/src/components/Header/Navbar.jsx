import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Space, Typography, Dropdown, Avatar } from 'antd'
import { useAuth } from '../../context/Auth'

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

    const userMenuItems = [
        {
            key: 'dashboard',
            label: <Link to="/dashboard">Dashboard</Link>,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: <span onClick={handleLogout}>Logout</span>,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
            danger: true
        }
    ]

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 py-4 ${scrolled ? 'bg-[#0a0a14]/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                
                {/* Logo */}
                <Link 
                    to="/" 
                    className="text-2xl font-black tracking-tighter uppercase bg-gradient-to-r from-white to-[#00DFD8] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                >
                    REACT
                </Link>

                {/* Mobile Toggler */}
                <button 
                    className="lg:hidden text-white p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>

                {/* Nav Links */}
                <div className={`lg:flex items-center gap-8 ${menuOpen ? 'absolute top-full left-0 right-0 bg-[#0a0a14] p-6 flex flex-col items-center' : 'hidden'}`}>
                    <ul className="flex flex-col lg:flex-row items-center gap-6 list-none p-0 m-0">
                        <li>
                            <NavLink to="/" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-white ${isActive ? 'text-white underline underline-offset-4' : 'text-white/70'}`}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-white ${isActive ? 'text-white underline underline-offset-4' : 'text-white/70'}`}>About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-white ${isActive ? 'text-white underline underline-offset-4' : 'text-white/70'}`}>Contact</NavLink>
                        </li>
                        <li className="relative group">
                            <button className="text-sm font-medium text-white/70 hover:text-white flex items-center gap-1">
                                Hooks
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <div className="absolute top-full left-0 hidden group-hover:block bg-[#0f0f1e] border border-white/10 rounded-lg p-2 min-w-[160px] shadow-xl mt-2">
                                <Link to="/hooks/useState" className="block px-4 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 rounded">useState</Link>
                                <Link to="/hooks/useEffect" className="block px-4 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 rounded">useEffect</Link>
                                <Link to="/hooks/useContext" className="block px-4 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 rounded">useContext</Link>
                                <Link to="/hooks/useRef" className="block px-4 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 rounded">useRef</Link>
                                <Link to="/hooks/useReducer" className="block px-4 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 rounded">useReducer</Link>
                            </div>
                        </li>
                    </ul>

                    {/* Auth section */}
                    <div className="flex items-center gap-4">
                        <Space size="small">
                            {isAuth ? (
                                <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
                                    <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded-full transition-colors border border-transparent hover:border-white/10 pr-3">
                                        <Avatar className="bg-gradient-to-r from-indigo-500 to-purple-600 border border-white/20 shadow-lg text-white font-bold">
                                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </Avatar>
                                        <span className="text-white/90 text-sm font-medium hidden sm:block">
                                            {user?.name?.split(' ')[0]}
                                        </span>
                                        <svg className="w-3 h-3 text-white/50 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </Dropdown>
                            ) : (
                                <>
                                    <Link to="/auth/login" className="bg-green-600 hover:bg-green-700 text-white text-xs px-4 py-1.5 rounded-lg transition-colors">Login</Link>
                                    <Link to="/auth/register" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1.5 rounded-lg transition-colors">Register</Link>
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