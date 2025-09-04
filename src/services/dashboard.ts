import api from '@/config/axios';
import { toast } from 'react-toastify';

export type DashboardSummary = {
    total_quizzes: number;
    total_questions: number;
    total_answers: number;
    participants: number;
    accuracy: number;
};

export type ActivityItem = {
    question_id: number;
    question: string;
    created_at: string;
    answers: number;
};

export type ResponsesPerDayItem = {
    day: string; // "YYYY-MM-DD"
    responses: number;
};

export type QuestionOption = {
    option_id: number;
    text: string;
    count: number;
    correct?: boolean;
};

export type QuestionStats = {
    question_id: number;
    text: string;
    total_answers: number;
    accuracy: number;
    options: QuestionOption[];
};

function getToken(): string | null {
    return (
        sessionStorage.getItem('token') ||
        sessionStorage.getItem('access_token') ||
        localStorage.getItem('token') ||
        localStorage.getItem('access_token')
    );
}

function getAuthHeader() {
    const token = getToken();
    if (!token) {
        console.warn('[dashboard] token não encontrado em session/localStorage');
        return null;
    }
    return { Authorization: `Bearer ${token}` };
}

/** Extrai payload aceitando {data: X} ou X */
function unwrap<T>(raw: any): T {
    return (raw?.data ?? raw) as T;
}

export async function getDashboardSummary() {
    try {
        const headers = getAuthHeader();
        if (!headers) return null;

        const { data } = await api.get('/api/dashboard/quiz/summary/', { headers });

        console.log('[service] summary raw:', data);
        return unwrap<DashboardSummary>(data) ?? null;
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            'Erro ao buscar resumo do dashboard!';
        toast.error(message);
        return null;
    }
}

export async function getLastActivities() {
    try {
        const headers = getAuthHeader();
        if (!headers) return [];

        const { data } = await api.get('/api/dashboard/quiz/last-activities', { headers });

        const payload = unwrap<ActivityItem[] | { data: ActivityItem[] }>(data);
        const list = Array.isArray(payload) ? payload : (payload as any)?.data;
        return Array.isArray(list) ? list : [];
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            'Erro ao buscar últimas atividades!';
        toast.error(message);
        return [];
    }
}

export async function getResponsesPerDay(days = 7) {
    try {
        const headers = getAuthHeader();
        if (!headers) return [];

        const { data } = await api.get(
            `/api/dashboard/quiz/responses-per-day/?days=${days}`,
            { headers }
        );

        const payload = unwrap<ResponsesPerDayItem[] | { data: ResponsesPerDayItem[] }>(data);
        const list = Array.isArray(payload) ? payload : (payload as any)?.data;
        return Array.isArray(list) ? list : [];
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            'Erro ao buscar respostas por dia!';
        toast.error(message);
        return [];
    }
}

export async function getQuestionStats(questionId: number) {
  try {
    const headers = getAuthHeader();
    if (!headers) return null;

    const { data } = await api.get(
      `/api/dashboard/quiz/questions/${questionId}/stats/`,
      { headers }
    );

    return unwrap<QuestionStats>(data) ?? null;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Erro ao buscar estatísticas da questão!';
    toast.error(message);
    return null;
  }
}
