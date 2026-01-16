import HttpClient from "../HttpClient";

export async function getCertificateTypes() {
    try {
        const response = await HttpClient.get('/certicates/get-certificate-types');
        return response;
    }
    catch (error) {
        throw error;
    }
}