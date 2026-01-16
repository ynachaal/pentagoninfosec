import axios from 'axios';

class HttpClient {
    constructor() {
        this.instance = axios.create({
           // baseURL: 'https://api.pentagoninfosec.com/api/v1', // Replace with your API base URL
            baseURL: 'http://localhost:4000/api/v1',
        });

        this.instance.interceptors.request.use(
            this._handleRequest,
            this._handleRequestError
        );

        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleResponseError
        );
    }

    _handleRequest = (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    };

    _handleRequestError = (error) => {
        return Promise.reject(error);
    };

    _handleResponse = (response) => {
        return response;
    };

    _handleResponseError = (error) => {
        return Promise.reject(error);
    };

    get = (url, queryparams, config) => {
        return this.instance.get(url, { params: queryparams, ...config });
    };

    post = (url, data, config) => {
        return this.instance.post(url, data, config);
    };

    put = (url, data, config) => {
        return this.instance.put(url, data, config);
    };

    delete = (url, config) => {
        return this.instance.delete(url, config);
    };
}

export default new HttpClient();