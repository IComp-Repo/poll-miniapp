import api from "@/config/axios";
import { API_ROUTES } from "@/config/routes";
import axios from "axios";

interface Quiz {
  question: string;
  options: string[];
  correctOption: number;
}

export async function postQuiz(quizData: Quiz[], selectedGroup: string) {
  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  };

  try {
    const response = await api.post(
      API_ROUTES.POLLS.QUIZZ,
      {
        chatId: selectedGroup,
        questions: quizData,
      },
      { headers }
    );

    return { success: true, data: response };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      return { success: false, error: error.response?.data || error.message };
    }
    console.error("Unexpected error:", error);
    return { success: false, error: "Unexpected error occurred" };
  }
}
