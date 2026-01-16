// requireAuth.js (Authentication HOC)
import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminAuthService from './AdminAuthService';

const requireAdminAuth = (Component) => {
    return class AuthenticatedComponent extends React.Component {
        render() {
            if (AdminAuthService.isAuthenticated()) {
                // If authenticated, render the protected component
                return <Component {...this.props} />;
            } else {
                // If not authenticated, redirect to the login page
                return <Navigate to="/" />;
            }
        }
    };
};

export default requireAdminAuth;
