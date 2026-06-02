import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const authApi = {
  register: (payload) => api.post('/auth/register', payload),
  login: (payload) => api.post('/auth/login', payload),
  logout: () => api.post('/auth/logout')
};

export const predictionApi = {
  create: (payload) => api.post('/predict', payload)
};

export const historyApi = {
  list: (userId) => api.get('/history', { params: { userId } }),
  remove: (id, userId) => api.delete(`/history/${id}`, { params: { userId } })
};

export const dashboardApi = {
  stats: (userId) => api.get('/dashboard/stats', { params: { userId } })
};

export default api;

