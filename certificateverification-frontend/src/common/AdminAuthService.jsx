// AuthService.js
class AdminAuthService {
    isAuthenticated() {
        const token = localStorage.getItem('token');
        // Check if token exists and is not expired
        return token && !this.isTokenExpired(token) && this.isAdmin(token);
    }

    isTokenExpired(token) {
        // Check token expiry
        const expiry = JSON.parse(atob(token.split('.')[1])).exp;
        return Date.now() >= expiry * 1000;
    }

    isAdmin(token) {
        return JSON.parse(atob(token.split('.')[1])).isAdmin;
    }
}

export default new AdminAuthService();
