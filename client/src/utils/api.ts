import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use((res) => {
  if (res.config.url !== '/auth/whoami') {
    localStorage.setItem('lastApiResponseMs', Date.now().toString());
  }

  return res;
});

export default api;
