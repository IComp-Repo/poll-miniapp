import api from '@/config/axios';
import { API_ROUTES } from '@/config/routes';

export async function createPolls(question: string, options: string[], groupId: string) {
    try {
        const response = await api.post(API_ROUTES.POLLS.CREATE, {
            question,
            options,
            groupId,
        }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error creating poll:', error);
        throw error;
    }
}