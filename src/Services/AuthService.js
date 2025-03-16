class AuthService {
    static isLoggedIn() {
        const token = localStorage.getItem('accesToken');
        return token !== null;
    }

    static isAdmin() {
        return localStorage.getItem('isAdmin') === '1';
    }

    static logout() {
        localStorage.clear();
        window.location.href = '/login';
    }
}

export default AuthService;