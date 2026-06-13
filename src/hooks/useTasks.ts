import { useState, useEffect, useCallback } from 'react';
import { tasksApi } from '../services/api';
import type { Task, TaskStatus, TaskPriority } from '../types';

export function useTasks(projectId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ status?: TaskStatus; priority?: TaskPriority; search?: string }>({});

  const fetchTasks = useCallback(async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      setError(null);
      const { data } = await tasksApi.getByProject(projectId, filters);
      setTasks(data.tasks);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [projectId, filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (data: { title: string; description?: string; status?: TaskStatus; priority?: TaskPriority }) => {
    const { data: response } = await tasksApi.create(projectId, data);
    setTasks(prev => [response.task, ...prev]);
    return response.task;
  };

  const updateTask = async (id: string, data: { title?: string; description?: string; status?: TaskStatus; priority?: TaskPriority }) => {
    const { data: response } = await tasksApi.update(id, data);
    setTasks(prev => prev.map(t => t.id === id ? response.task : t));
    return response.task;
  };

  const deleteTask = async (id: string) => {
    await tasksApi.delete(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return { tasks, loading, error, filters, setFilters, createTask, updateTask, deleteTask, refetch: fetchTasks };
}
