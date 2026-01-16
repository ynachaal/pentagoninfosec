/* eslint-disable no-useless-catch */
import HttpClient from "../../../utils/HttpClient";

// certificateById
export async function verifyCertificateById(certificateNumber) {
    try {
        const response = await HttpClient.get('/certicates/verify-certificate', certificateNumber);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Login failed');
        }
    }
    catch (error) {
        throw error;
    }
}

// sendEmail
export async function sendEmail(contactData) {
    try {
        const response = await HttpClient.post('/certicates/send-form-mail', contactData);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}