import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from './Auth'
import Frontend from './Frontend'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/*" element={<Frontend />} />
        </Routes>
    )
}

export default AppRoutes