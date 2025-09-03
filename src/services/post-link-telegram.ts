import api from '@/config/axios';
import { API_ROUTES } from '@/config/routes';


export const postLinkTelegram = async (token: string) => {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await api.post(API_ROUTES.LINK.TELEGRAM, {}, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
}