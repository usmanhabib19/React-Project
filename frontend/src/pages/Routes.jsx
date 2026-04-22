import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from './Auth'
import Frontend from './Frontend'
import Index from './Dashboard'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/dashboard/*" element={<Index />} />
            <Route path="/*" element={<Frontend />} />
        </Routes>
    )
}

export default AppRoutes