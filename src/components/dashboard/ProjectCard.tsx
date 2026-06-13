import { motion } from 'framer-motion';
import { MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dropdown } from '../ui/Dropdown';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
  onEdit: (project: Project) => void;
}

export function ProjectCard({ project, onDelete, onEdit }: ProjectCardProps) {
  const stats = project.stats;
  const completionRate = stats && stats.totalTasks > 0
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-surface border border-surface-lighter rounded-xl p-5 hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between mb-4">
        <Link to={`/dashboard/projects/${project.id}`} className="flex-1">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
            <h3 className="text-white font-semibold font-display group-hover:text-accent transition-colors">
              {project.name}
            </h3>
          </div>
        </Link>
        <Dropdown
          trigger={
            <button className="p-1 text-gray-500 hover:text-white rounded-lg hover:bg-surface-light transition-colors opacity-0 group-hover:opacity-100">
              <MoreHorizontal size={16} />
            </button>
          }
          options={[
            { label: 'Edit', value: 'edit', icon: <Edit size={14} /> },
            { label: 'Delete', value: 'delete', icon: <Trash2 size={14} />, danger: true },
          ]}
          onSelect={value => {
            if (value === 'edit') onEdit(project);
            if (value === 'delete') onDelete(project.id);
          }}
        />
      </div>

      {project.description && (
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
      )}

      {stats && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Progress</span>
            <span className="text-gray-400 font-mono">{completionRate}%</span>
          </div>
          <div className="w-full h-1.5 bg-surface-lighter rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{stats.totalTasks} tasks</span>
            <span className="text-success">{stats.completedTasks} done</span>
            <span className="text-accent">{stats.inProgressTasks} active</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
