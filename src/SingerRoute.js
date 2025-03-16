// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import AuthService from './Services/AuthService'
import { Navigate } from 'react-router-dom'
import NavBar from './NavBar'

function SingerRoute({ children }) {
    const auth = AuthService.isLoggedIn()
    const isAdmin = AuthService.isAdmin()
    return auth && !isAdmin ?
        <div>
            <NavBar />
            {children}
        </div>
        : <Navigate to="/login" />;
}
export default SingerRoute
