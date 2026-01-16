import React, { createContext } from 'react';
import { createQuery } from '../repository/QuestionaireAPI';
import { showLoading } from 'react-global-loading';
import { toast } from 'react-toastify';

export const QuestionaireContext = createContext();

export const QuestionaireProvider = ({ children }) => {

    // sendQuery
    const certificateQuery = async (data) => {
        const newData = { ...data, certificateType: data.certificateType.nameOfCertificate }
        try {
            showLoading(true);
            const responseData = await createQuery(newData);
            showLoading(false);
            if (responseData) {
                if (responseData) {
                    toast.success("E-mail sent Successfully ");
                }
            }
        }
        catch (error) {
            showLoading(false);
            console.log("not sent", error)
        }
    }

    return (
        <QuestionaireContext.Provider
            value={{
                certificateQuery
            }}
        >

            {children}
        </QuestionaireContext.Provider>
    )
}
