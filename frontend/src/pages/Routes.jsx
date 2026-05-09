import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from './Auth'
import Frontend from './Frontend'
import Index from './Dashboard'
import ResetPassword from './Auth/ResetPassword'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
            <Route path="/dashboard/*" element={<Index />} />
            <Route path="/*" element={<Frontend />} />
        </Routes>
    )
}

export default AppRoutes