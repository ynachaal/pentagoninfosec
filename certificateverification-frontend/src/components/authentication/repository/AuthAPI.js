import HttpClient from "../../../utils/HttpClient";

export async function signIn(data) {
    try {
        const response = await HttpClient.post('/users/user-login', data);
        return response;
    }
    catch (error) {
        throw error;
    }
}

export async function signUp(data) {
    try {
        const response = await HttpClient.post('/users/user-signup', data);
        if (response.status === 200) {
            return response;
        } else {
            throw new Error('SignUp failed');
        }
    }
    catch (error) {
        throw error;
    }
}