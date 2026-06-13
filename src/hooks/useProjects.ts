import { useState, useEffect, useCallback } from 'react';
import { projectsApi } from '../services/api';
import type { Project } from '../types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await projectsApi.getAll();
      setProjects(data.projects);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (data: { name: string; description?: string; color?: string }) => {
    const { data: response } = await projectsApi.create(data);
    setProjects(prev => [response.project, ...prev]);
    return response.project;
  };

  const updateProject = async (id: string, data: { name?: string; description?: string; color?: string }) => {
    const { data: response } = await projectsApi.update(id, data);
    setProjects(prev => prev.map(p => p.id === id ? response.project : p));
    return response.project;
  };

  const deleteProject = async (id: string) => {
    await projectsApi.delete(id);
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return { projects, loading, error, createProject, updateProject, deleteProject, refetch: fetchProjects };
}
