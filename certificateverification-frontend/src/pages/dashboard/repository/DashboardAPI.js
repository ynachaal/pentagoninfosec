import HttpClient from "../../../utils/HttpClient";

// create Certificate
export async function generateCertificate(certificateData) {
    try {
        const response = await HttpClient.post('/certicates/generate-certificate', certificateData);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// get expired Certificates
export async function getExpiredCertificates(pagination = { page: 1, perPage: 10 }) {
    try {
        const response = await HttpClient.get(`/certicates/get-expiring-certificates?page=${pagination.page}&perPage=${pagination.perPage}`);
        return response;
    }
    catch (error) {
        throw error;
    }
}

// get issued Certificates
export async function getIssueCertificates(pagination = { page: 1, perPage: 10 }) {
    try {
        const response = await HttpClient.get(`/certicates/get-certificates?page=${pagination.page}&perPage=${pagination.perPage}`);
        return response;
    }
    catch (error) {
        throw error;
    }
}
// get issued Certificates
export async function getUserDetails() {
    try {
        const response = await HttpClient.get(`/users/get-user`);
        return response;
    }
    catch (error) {
        throw error;
    }
}
// get issued Certificates
export async function updateUserDetails(body) {
    try {
        const response = await HttpClient.put(`/users/update-profile`, body);
        return response;
    }
    catch (error) {
        throw error;
    }
}
// get issued Certificates
export async function changePassword(body) {
    try {
        const response = await HttpClient.put(`/users/change-password`, body);
        return response;
    }
    catch (error) {
        throw error;
    }
}