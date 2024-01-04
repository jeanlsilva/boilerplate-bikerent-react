import apiClient from './api';

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

async function createUser(data: CreateUserRequest) {
    try {
        const response = await apiClient.post('/users', data)

        return response
    } catch(error) {
        console.log({ error })
    }
}

export default createUser;