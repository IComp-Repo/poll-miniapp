import api from '@/config/axios';
import { API_ROUTES } from '@/config/routes';
import { QuizGenerationInput } from '@/schemas/interfaceQuizz';

export async function postGenerateQuiz(data: QuizGenerationInput) {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error("Usuário não autenticado.");
    }

    const { data: result } = await api.post(API_ROUTES.QUIZ.GENERATE, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return result;
  } catch (error: any) {
    const message =
      error?.data?.message ||
      error?.message ||
      "Erro ao gerar quiz!";
    throw new Error(message);
  }
}