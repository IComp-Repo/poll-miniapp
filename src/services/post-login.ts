import api from '@/config/axios';
import { API_ROUTES } from '@/config/routes';
import { LoginFormData } from '@/schemas/loginSchema';


export const postLogin = async (data : LoginFormData) => {
  try {
    const response = await api.post(API_ROUTES.AUTH.LOGIN, data);
    return response;
  } catch (error) {
    throw error;
  }
}