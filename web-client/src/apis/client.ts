import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_CORE_SERVER_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
});
