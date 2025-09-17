// src/services/post-quizz.ts
import api from "@/config/axios";
import { API_ROUTES } from "@/config/routes";
import axios from "axios";

interface Quiz {
  question: string;
  options: string[];
  correctOption: number;
}

type PostQuizParams = {
  questions: Quiz[];
  chatId: string;
  schedule_date?: string | null; // "YYYY-MM-DD"
  schedule_time?: string | null; // "HH:mm"
};

export async function postQuiz({
  questions,
  chatId,
  schedule_date = null,
  schedule_time = null,
}: PostQuizParams) {
  const token = sessionStorage.getItem('token');
  if (!token) {
    throw new Error("Usuário não autenticado.");
  }
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const body: Record<string, any> = {
      chatId,
      questions,
    };

    if (schedule_date) body.schedule_date = schedule_date;
    if (schedule_time) body.schedule_time = schedule_time;

    const response = await api.post(API_ROUTES.POLLS.QUIZZ, body, { headers });
    return { success: true, data: response };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, error: error.response?.data || error.message };
    }
    return { success: false, error: "Unexpected error occurred" };
  }
}
