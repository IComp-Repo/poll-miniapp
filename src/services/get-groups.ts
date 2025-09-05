import api from '@/config/axios';
import { API_ROUTES, APP_ROUTES } from '@/config/routes';
import { useAuth } from '@/shared/context/AuthContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export async function getGroups() {
  const auth = useAuth();
  const router = useRouter();
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error("Usuário não autenticado.");
      auth.logout();
      router.push(APP_ROUTES.PRINCIPAL);
      return [];
    }

    const { data } = await api.get(API_ROUTES.GROUPS.SHOW, {
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

