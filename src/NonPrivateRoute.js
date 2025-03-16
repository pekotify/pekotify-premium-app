import React from 'react'
import AuthService from './Services/AuthService'
import { Navigate } from 'react-router-dom'

function NonPrivateRoute({ children }) {
    const auth = AuthService.isLoggedIn()
    return !auth ?
        <div>
            {children}
        </div>
        : <Navigate to="/" />;
}
export default NonPrivateRoute