import HttpClient from "../../../utils/HttpClient";

// createQuery
export async function createQuery(queryData) {
    try {
        const response = await HttpClient.post('certicate-query/create-query', queryData);
        return response.data
    }
    catch (error) {
        throw error;
    }
}