import { Navigate } from 'react-router-dom'
import AuthService from './Services/AuthService'

const Home = () => {
    const isAdmin = AuthService.isAdmin()
    if (isAdmin) {
        return (
            <Navigate to="/admin-page" />
        )
    } else {
        return (
            <Navigate to="/singer-page" />
        )
    }
}
 
export default Home;