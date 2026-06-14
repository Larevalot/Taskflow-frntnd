import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Settings } from 'lucide-react';
import { Sidebar } from '../components/dashboard/Sidebar';
import { TaskBoard } from '../components/dashboard/TaskBoard';
import { SearchBar } from '../components/dashboard/SearchBar';
import { Badge } from '../components/ui/Badge';
import { useTasks } from '../hooks/useTasks';
import { projectsApi } from '../services/api';
import type { Project, TaskStatus, TaskPriority } from '../types';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loadingProject, setLoadingProject] = useState(true);
  const { tasks, loading: loadingTasks, filters, setFilters, createTask, updateTask, deleteTask } = useTasks(id || '');

  useEffect(() => {
    async function loadProject() {
      if (!id) return;
      try {
        const { data } = await projectsApi.getById(id);
        setProject(data.project);
      } catch (err) {
        console.error('Failed to load project:', err);
      } finally {
        setLoadingProject(false);
      }
    }
    loadProject();
  }, [id]);

  const handleFilterChange = useCallback((newFilters: { status?: TaskStatus; priority?: TaskPriority; search?: string }) => {
    setFilters(newFilters);
  }, [setFilters]);

  if (loadingProject) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 ml-64 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
        </main>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 mb-4">Project not found.</p>
            <Link to="/dashboard" className="text-accent hover:text-accent-hover">← Back to Dashboard</Link>
          </div>
        </main>
      </div>
    );
  }

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-6">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: project.color }} />
              <h1 className="text-2xl font-bold font-display text-white">{project.name}</h1>
            </div>
            {project.description && (
              <p className="text-gray-400 mt-2">{project.description}</p>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Badge variant="default">{stats.total} tasks</Badge>
            <Badge variant="default">{stats.pending} pending</Badge>
            <Badge variant="info">{stats.inProgress} in progress</Badge>
            <Badge variant="success">{stats.completed} done</Badge>
          </div>

          <SearchBar onFilterChange={handleFilterChange} />

          <div className="mt-6">
            {loadingTasks ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
              </div>
            ) : (
              <TaskBoard
                tasks={tasks}
                onCreateTask={async (data) => {
                  await createTask(data);
                }}
                onUpdateTask={async (id, data) => {
                  await updateTask(id, data as any);
              }}
                onDeleteTask={deleteTask}
              />
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
