import api from '@/config/axios';
import { API_ROUTES } from '@/config/routes';

export async function createPolls(question: string, options: string[], chatId: string) {
    console.log('Creating poll with:', { question, options, chatId });
    try {
        const response = await api.post(API_ROUTES.POLLS.CREATE, {
            question,
            options,
            chatId,
        }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        });
        console.log('Poll created successfully:', response.data);
        return response;
    } catch (error) {
        console.error('Error creating poll:', error);
        throw error;
    }
}