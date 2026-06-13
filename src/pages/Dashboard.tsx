import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '../components/dashboard/Sidebar';
import { ProjectCard } from '../components/dashboard/ProjectCard';
import { Stats } from '../components/dashboard/Stats';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useProjects } from '../hooks/useProjects';
import type { Project } from '../types';

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#8b5cf6', '#f97316'];

export function Dashboard() {
  const { projects, loading, createProject, updateProject, deleteProject } = useProjects();
  const [showCreate, setShowCreate] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [form, setForm] = useState({ name: '', description: '', color: '#6366f1' });
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setForm({ name: '', description: '', color: '#6366f1' });
    setEditProject(null);
  };

  const handleCreate = async () => {
    if (!form.name.trim()) return;
    setSubmitting(true);
    try {
      await createProject(form);
      setShowCreate(false);
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!editProject || !form.name.trim()) return;
    setSubmitting(true);
    try {
      await updateProject(editProject.id, form);
      setEditProject(null);
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
    }
  };

  const openEdit = (project: Project) => {
    setForm({ name: project.name, description: project.description || '', color: project.color });
    setEditProject(project);
  };

  const projectsWithStats = projects.map(p => ({
    ...p,
    stats: p.stats || { totalTasks: p._count?.tasks || 0, completedTasks: 0, inProgressTasks: 0, pendingTasks: 0, highPriorityTasks: 0 },
  }));

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar onNewProject={() => setShowCreate(true)} />
      <main className="flex-1 ml-64 p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold font-display text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Overview of your projects and tasks.</p>
          </div>

          <Stats projects={projects} />

          <div className="mt-8 mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold font-display text-white">Projects</h2>
            <Button size="sm" onClick={() => setShowCreate(true)}>
              + New Project
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 bg-surface border border-surface-lighter rounded-xl">
              <p className="text-gray-400 mb-4">No projects yet. Create your first one!</p>
              <Button onClick={() => setShowCreate(true)}>+ Create Project</Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectsWithStats.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={handleDelete}
                  onEdit={openEdit}
                />
              ))}
            </div>
          )}
        </motion.div>
      </main>

      <Modal
        isOpen={showCreate}
        onClose={() => { setShowCreate(false); resetForm(); }}
        title="Create Project"
      >
        <ProjectFormContent
          form={form}
          setForm={setForm}
          onSubmit={handleCreate}
          onCancel={() => { setShowCreate(false); resetForm(); }}
          submitting={submitting}
          submitLabel="Create Project"
        />
      </Modal>

      <Modal
        isOpen={!!editProject}
        onClose={() => { setEditProject(null); resetForm(); }}
        title="Edit Project"
      >
        <ProjectFormContent
          form={form}
          setForm={setForm}
          onSubmit={handleUpdate}
          onCancel={() => { setEditProject(null); resetForm(); }}
          submitting={submitting}
          submitLabel="Save Changes"
        />
      </Modal>
    </div>
  );
}

function ProjectFormContent({ form, setForm, onSubmit, onCancel, submitting, submitLabel }: {
  form: { name: string; description: string; color: string };
  setForm: (f: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
  submitting: boolean;
  submitLabel: string;
}) {
  return (
    <div className="space-y-4">
      <Input
        label="Project Name"
        placeholder="My awesome project"
        value={form.name}
        onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))}
      />
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-300">Description</label>
        <textarea
          className="w-full px-4 py-2.5 bg-surface border border-surface-lighter rounded-lg text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none h-20"
          placeholder="What's this project about?"
          value={form.description}
          onChange={e => setForm((f: any) => ({ ...f, description: e.target.value }))}
        />
      </div>
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-300">Color</label>
        <div className="flex gap-2">
          {COLORS.map(color => (
            <button
              key={color}
              onClick={() => setForm((f: any) => ({ ...f, color }))}
              className={`w-8 h-8 rounded-full transition-all ${form.color === color ? 'ring-2 ring-offset-2 ring-offset-surface ring-white scale-110' : 'hover:scale-105'}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>
        <Button onClick={onSubmit} loading={submitting} className="flex-1">{submitLabel}</Button>
      </div>
    </div>
  );
}
