import axios from 'axios'
import { API_DOMAIN } from 'config';

async function getUserByToken(token: string) {
    try {
        const response = await axios.get(`${API_DOMAIN}/users/me`, {
            headers: {
                Authorization: token
            }
        })

        return response.data;
    } catch (error: any) {
        console.log({ error })
    }
}

export default getUserByToken;