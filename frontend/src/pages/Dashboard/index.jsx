import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
// import Profile from './Profile'

const Index = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
    )
}

export default Index