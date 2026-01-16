// AuthService.js
class UserAuthService {
    isAuthenticated() {
        const token = localStorage.getItem('token');
        if (token && this.isTokenExpired(token)) {
            localStorage.removeItem('token');
            window.location = '/';
        }
        // Check if token exists and is not expired
        return token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        // Check token expiry
        const expiry = JSON.parse(atob(token.split('.')[1])).exp;
        return Date.now() >= expiry * 1000;
    }
}

export default new UserAuthService();
