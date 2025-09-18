import api from '@/config/axios';
import { API_ROUTES } from '@/config/routes';
import type { QuizGenerationInput } from '@/schemas/interfaceQuizz';

export async function postGenerateQuiz(data: QuizGenerationInput) {

  const token = sessionStorage.getItem('token');
  if (!token) throw new Error('Usuário não autenticado.');

  try {
    const res = await api.post(API_ROUTES.QUIZ.GENERATE, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = (res && typeof res === 'object' && 'data' in (res as any))
      ? (res as any).data
      : res;

    return result; 
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      'Erro ao gerar quiz!';
    throw new Error(message);
  }
}
