import api from '@/config/axios';
import { toast } from 'react-toastify';

export async function getGroups() {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error("Usuário não autenticado.");
      return [];
    }

    const { data } = await api.get('/api/user-groups/', {
      headers: { Authorization: `Bearer ${token}` },
    });

    // {data:{groups}} ou {groups}
    const groups = data?.data?.groups ?? data?.groups ?? [];

    if (!groups.length) {
      toast.warn("Nenhum grupo encontrado.");
    }

    return groups;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Erro ao buscar grupos!";
    toast.error(message);
    return [];
  }
}

