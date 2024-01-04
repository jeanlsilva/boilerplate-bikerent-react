import apiClient from './api';

interface LoginRequest {
    email: string;
    password: string;
}

async function login(data: LoginRequest) {
    try {
        const response = await apiClient.post('/users/authenticate', data);

        return response.data;
    } catch (error) {
        console.log({ error })
        return null;
    }
}

export default login;