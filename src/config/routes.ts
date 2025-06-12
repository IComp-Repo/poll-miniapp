const BASE_URL = process.env.VITE_API_BASE_URL || "http://localhost:8000";

export const API_ROUTES = {
    AUTH: {
        LOGIN: `${BASE_URL}/api/login`,
    }
};