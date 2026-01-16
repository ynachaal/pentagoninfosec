import React, { createContext, useContext, useState } from 'react';
import { getCertificateTypes } from '../repository/commonAPI';

export const CommonContext = createContext();

export const CommonProvider = ({ children }) => {

    const [serviceTypes, setServiceTypes] = useState([]);
    const [token, setToken] = useState();

    // token 
    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
        }
    }, []);

    const clearLocalStorage = () => {
        localStorage.clear('token');
        setToken(null);
        // To refresh the currenlt active web page
        window.location.reload();

    }
    // Certificate Types
    const certificateTypes = async () => {
        try {
            const responseData = await getCertificateTypes();
            setServiceTypes(responseData.data.certificates);
        }
        catch (error) {
            console.log("not found", error)
        }
    }

    // Format Date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        return date.toLocaleDateString(undefined, options);
    }

    return (
        <CommonContext.Provider
            value={{
                certificateTypes,
                formatDate,
                serviceTypes,
                token,
                clearLocalStorage
            }}
        >
            {children}
        </CommonContext.Provider>
    )
}