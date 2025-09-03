import api from '@/config/axios';
import { API_ROUTES } from '@/config/routes';
import { RegisterSchemaInput } from '@/schemas/registerSchema';

export async function postRegister(data: RegisterSchemaInput) {
    try {
        const response = await api.post(API_ROUTES.AUTH.REGISTER, data);
        return response;
    } catch (error) {
        throw error;
    }
}