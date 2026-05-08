import React, { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext()

const initialState = {
    isAuth: !!localStorage.getItem('currentUser') || !!sessionStorage.getItem('currentUser'),
    user: JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser') || '{}')
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { isAuth: true, user: action.payload }
        case "LOGOUT":
            localStorage.removeItem('currentUser')
            sessionStorage.removeItem('currentUser')
            localStorage.removeItem('rememberMe')
            return { isAuth: false, user: {} }
        default:
            return state
    }
}


const Auth = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext)

export default Auth