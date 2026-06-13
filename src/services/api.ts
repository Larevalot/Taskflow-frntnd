import axios from 'axios';
import type { AuthResponse, User, Project, Task, TaskStatus, TaskPriority } from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('taskflow_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('taskflow_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const authApi = {
  register: (data: { email: string; name: string; password: string }) =>
    api.post<AuthResponse>('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', data),
  getMe: () => api.get<{ user: User }>('/auth/me'),
};

// Projects
export const projectsApi = {
  getAll: () => api.get<{ projects: Project[] }>('/projects'),
  getById: (id: string) => api.get<{ project: Project }>(`/projects/${id}`),
  create: (data: { name: string; description?: string; color?: string }) =>
    api.post<{ project: Project }>('/projects', data),
  update: (id: string, data: { name?: string; description?: string; color?: string }) =>
    api.put<{ project: Project }>(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
};

// Tasks
export const tasksApi = {
  getByProject: (projectId: string, params?: { status?: TaskStatus; priority?: TaskPriority; search?: string }) =>
    api.get<{ tasks: Task[] }>(`/projects/${projectId}/tasks`, { params }),
  create: (projectId: string, data: { title: string; description?: string; status?: TaskStatus; priority?: TaskPriority }) =>
    api.post<{ task: Task }>(`/projects/${projectId}/tasks`, data),
  update: (id: string, data: { title?: string; description?: string; status?: TaskStatus; priority?: TaskPriority }) =>
    api.put<{ task: Task }>(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`),
};

export default api;
