export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/v1/auth/login/',
    REGISTER: '/api/v1/auth/register/',
  },
  POLLS: {
    CREATE: '/api/v1/quiz/send-poll/',
    QUIZZ: '/api/v1/quiz/send-quiz/'
  },
  GROUPS: {
    SHOW: '/api/v1/auth/user-groups/'
  },
  LINK: {
    TELEGRAM: '/api/v1/telegram/link/'
  },
  QUIZ: {
    GENERATE: '/api/v1/ai/generate-quiz/'
  },
  DASHBOARD: {
    SUMMARY: '/api/v1/quiz/dashboard/quiz/summary/',
    LAST_ACTIVITIES: '/api/v1/quiz/dashboard/quiz/last-activities/',
    RESPONSES_PER_DAY: '/api/v1/quiz/dashboard/quiz/responses-per-day/',
    QUESTION_STATS: (questionId: number) => `/api/v1/quiz/dashboard/quiz/questions/${questionId}/stats/`,
  }
  
};


export const APP_ROUTES = {
  CREATE_POLLS: '/createPolls',
  LOGIN: '/login',
  REGISTER: '/register',
  MENU: '/menu',
  PRINCIPAL: '/'
};

