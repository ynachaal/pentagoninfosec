// requireAuth.js (Authentication HOC)
import React from 'react';
import { Navigate } from 'react-router-dom';
import UserAuthService from './UserAuthService';

const requireUserAuth = (Component) => {
    return class AuthenticatedComponent extends React.Component {
        render() {
            if (UserAuthService.isAuthenticated()) {
                // If authenticated, render the protected component
                return <Component {...this.props} />;
            } else {
                // If not authenticated, redirect to the login page
                return <Navigate to="/" />;
            }
        }
    };
};

export default requireUserAuth;
