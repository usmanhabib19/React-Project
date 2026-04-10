import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

const Auth = () => {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<div className="container py-5 text-center"><h1>404</h1><p>Auth Page Not Found</p></div>} />
        </Routes>
    )
}

export default Auth