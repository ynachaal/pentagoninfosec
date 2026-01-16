
import React, { createContext, useContext } from 'react';
import { verifyCertificateById, sendEmail } from '../repository/HomeAPI';
import { toast } from 'react-toastify';
import { showLoading } from 'react-global-loading';

// Context Name
export const HomeContext = createContext();

// Home Model Hook
export const UseHomeModal = () => {
    return useContext(HomeContext);
}

// Providing a provider so that this useState can be accessible throughout the Application 
export const HomeProvider = ({ children }) => {

    const [open, setOpen] = React.useState(false);
    const [certificateDetails, setCertificateDetails] = React.useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setCertificateDetails('');
        }, 800);
    };

    // Get Verification by certificate Number
    const certificateByNumber = async (data) => {
        showLoading(true);
        try {
            const responseData = await verifyCertificateById(data);
            setCertificateDetails(responseData.certificate);
            showLoading(false);
            setOpen(true);
        }
        catch (error) {
            setOpen(true);
            showLoading(false);
            console.log("not found", error);
        }
    }

    // To format date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        return date.toLocaleDateString(undefined, options);
    }

    // send email or getInTouch
    const contactUs = async (data) => {
        try {
            showLoading(true);
            const responseData = await sendEmail(data);
            showLoading(false);
            if (responseData) {
                toast.success("E-mail sent Successfully ");
            }
        } catch (error) {
            showLoading(false);
            console.log("not found", error)
        }
    }

    return (
        <HomeContext.Provider
            value={{
                certificateByNumber,
                handleClickOpen,
                handleClose,
                certificateDetails,
                open,
                formatDate,
                contactUs
            }}
        >
            {children}
        </HomeContext.Provider>
    )
}