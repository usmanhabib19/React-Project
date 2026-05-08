import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import UseState from './Hooks/useState'
import UseEffect from './Hooks/useEffect'
import UseContext from './Hooks/useContext'
import UseRef from './Hooks/useRef'
import UseReducer from './Hooks/useReducer'


const Frontend = () => {
    return (
        <main>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='contact' element={<Contact />} />
                <Route path='hooks'>
                    <Route path='useState' element={<UseState />} />
                    <Route path='useEffect' element={<UseEffect />} />
                    <Route path='useContext' element={<UseContext />} />
                    <Route path='useRef' element={<UseRef />} />
                    <Route path='useReducer' element={<UseReducer />} />
                </Route>

            </Routes>
            <Footer />
        </main>
    )
}

export default Frontend
