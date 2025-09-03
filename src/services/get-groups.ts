import api from '@/config/axios';
import { toast } from 'react-toastify';

export async function getGroups() {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error("Usuário não autenticado.");
      return [];
    }

    const response = await api.get('/api/user-groups/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data?.groups) {
      toast.warn("Nenhum grupo encontrado.");
      return [];
    }

    return response.data.groups;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Erro ao buscar grupos!";
    toast.error(message);
    return [];
  }
}
