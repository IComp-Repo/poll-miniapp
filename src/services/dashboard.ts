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
    correct_answers: number;
    incorrect_answers: number;
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

function unwrap<T>(raw: unknown): T {
    if (raw && typeof raw === 'object' && 'data' in (raw as any)) {
        return (raw as any).data as T;
    }
    return raw as T;
}

function handleApiError<T>(error: any, fallback: string, emptyValue: T): T {
    const message =
        error?.response?.data?.message ||
        error?.message ||
        fallback;
    toast.error(message);
    return emptyValue;
}

export async function getDashboardSummary() {
    try {
        const headers = getAuthHeader();
        if (!headers) return null;

        const { data } = await api.get('/api/dashboard/quiz/summary/', { headers });
        return unwrap<DashboardSummary>(data) ?? null;
    } catch (error) {
        return handleApiError(error, 'Erro ao buscar resumo do dashboard!', null);
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
    } catch (error) {
        return handleApiError(error, 'Erro ao buscar últimas atividades!', []);
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
    } catch (error) {
        return handleApiError(error, 'Erro ao buscar respostas por dia!', []);
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
    } catch (error) {
        return handleApiError(error, 'Erro ao buscar estatísticas da questão!', null);
    }
}
