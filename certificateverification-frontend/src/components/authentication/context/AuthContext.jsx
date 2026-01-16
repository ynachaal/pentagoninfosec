import React, { createContext, useContext, useState } from 'react';
import { signIn, signUp } from '../repository/AuthAPI';
import { toast } from 'react-toastify';
import { showLoading } from 'react-global-loading';

// Context Name
export const AuthContext = createContext();

// Auth Model Hook
export const UseAuthModal = () => {
    return useContext(AuthContext);
}

// Providing a provider so that this useState can be accessible throughout the Application 
export const AuthProvider = ({ children }) => {

    // Open the Auth Modal
    const [AuthModalOpen, setAuthModalOpen] = useState(false);

    const openAuthModal = () => {
        setAuthModalOpen(true);
    }

    const closeAuthModal = () => {
        setAuthModalOpen(false);
    }

    // SignIn and SignUp API call's
    const userSignIn = async (data) => {
        showLoading(true);
        try {
            const responseData = await signIn(data);
            if (responseData) {
                showLoading(false);

                // toast.success("Successfully LogedIn");
                const token = responseData.data.token;
                localStorage.setItem("token", token);
                window.location.reload();
            }

            else if (responseData.status == 401) {
                toast.error("Email or password is incorrect");
            }
        }
        catch (error) {
            showLoading(false);
            toast.error("Email or password is incorrect");
            console.log("not found", error);
        }
    }

    const userSignUp = async (data) => {
        const responseData = await signUp(data);
        if (responseData) {
            toast.success("Account created succussfully")
        }
        else {
            console.log("Exe..")
        }
    }


    return (
        <AuthContext.Provider
            value={{
                AuthModalOpen,
                openAuthModal,
                closeAuthModal,
                userSignIn,
                userSignUp
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}