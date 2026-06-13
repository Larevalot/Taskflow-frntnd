import { motion } from 'framer-motion';
import { FolderKanban, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import type { Project } from '../../types';

interface StatsProps {
  projects: Project[];
}

export function Stats({ projects }: StatsProps) {
  const totalProjects = projects.length;
  const allTasks = projects.flatMap(p => p.tasks || []);
  const totalTasks = projects.reduce((sum, p) => sum + (p.stats?.totalTasks || p._count?.tasks || 0), 0);
  const completedTasks = projects.reduce((sum, p) => sum + (p.stats?.completedTasks || 0), 0);
  const inProgressTasks = projects.reduce((sum, p) => sum + (p.stats?.inProgressTasks || 0), 0);
  const highPriorityTasks = projects.reduce((sum, p) => sum + (p.stats?.highPriorityTasks || 0), 0);

  const stats = [
    {
      label: 'Total Projects',
      value: totalProjects,
      icon: <FolderKanban size={20} />,
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
    {
      label: 'Tasks Completed',
      value: completedTasks,
      icon: <CheckCircle2 size={20} />,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      icon: <Clock size={20} />,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
    {
      label: 'High Priority',
      value: highPriorityTasks,
      icon: <AlertTriangle size={20} />,
      color: 'text-danger',
      bg: 'bg-danger/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-surface border border-surface-lighter rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
            <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
          <p className="text-3xl font-bold text-white font-display">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
