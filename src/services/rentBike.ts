import apiClient from './api';

interface RentBikeRequest {
    userId: number;
    bikeId: number;
    subtotal: number;
    feeAmount: number;
    total: number;
}

async function rentBike(data: RentBikeRequest) {
    try {
        const response = await apiClient.post('/bikes/rent', data);

        return response;
    } catch (error: any) {
        console.log({ error });
    }
}

export default rentBike;