// Defina a base da sua API (mude se for produção/dev)
const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/login',
    REGISTER: '/api/register',
  },
  POLLS: {
    CREATE: `${TELEGRAM_API}/send_poll`,
    MESSAGE: `${TELEGRAM_API}/sendMessage`
  },
};


export const APP_ROUTES = {
  CREATE_POLLS: '/createPolls',
  LOGIN: '/login',
  REGISTER: '/register',
};

