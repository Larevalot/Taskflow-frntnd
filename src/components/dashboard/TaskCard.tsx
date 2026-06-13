import { motion } from 'framer-motion';
import { GripVertical, Trash2, MoreHorizontal } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Dropdown } from '../ui/Dropdown';
import type { Task, TaskStatus, TaskPriority } from '../../types';

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, data: Partial<Task>) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
}

const statusConfig: Record<TaskStatus, { label: string; variant: 'default' | 'info' | 'success' }> = {
  pending: { label: 'Pending', variant: 'default' },
  in_progress: { label: 'In Progress', variant: 'info' },
  completed: { label: 'Completed', variant: 'success' },
};

const priorityConfig: Record<TaskPriority, { label: string; variant: 'default' | 'warning' | 'danger' }> = {
  low: { label: 'Low', variant: 'default' },
  medium: { label: 'Medium', variant: 'warning' },
  high: { label: 'High', variant: 'danger' },
};

export function TaskCard({ task, onUpdate, onDelete, isDragging }: TaskCardProps) {
  const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' },
  ];

  const priorityOptions = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`bg-surface border border-surface-lighter rounded-lg p-3 group hover:border-accent/20 transition-all ${isDragging ? 'shadow-lg shadow-accent/20 border-accent/40' : ''}`}
    >
      <div className="flex items-start gap-2">
        <div className="mt-1 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
          <GripVertical size={14} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-white'}`}>
              {task.title}
            </p>
            <Dropdown
              trigger={
                <button className="p-0.5 text-gray-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal size={14} />
                </button>
              }
              options={[
                ...statusOptions.map(s => ({ label: `Status: ${s.label}`, value: `status:${s.value}` })),
                ...priorityOptions.map(p => ({ label: `Priority: ${p.label}`, value: `priority:${p.value}` })),
                { label: 'Delete', value: 'delete', icon: <Trash2 size={14} />, danger: true },
              ]}
              onSelect={value => {
                if (value === 'delete') return onDelete(task.id);
                const [type, val] = value.split(':');
                if (type === 'status') onUpdate(task.id, { status: val as TaskStatus });
                if (type === 'priority') onUpdate(task.id, { priority: val as TaskPriority });
              }}
            />
          </div>
          {task.description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={priorityConfig[task.priority].variant}>
              {priorityConfig[task.priority].label}
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
