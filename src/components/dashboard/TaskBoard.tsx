import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { Task, TaskStatus, TaskPriority } from '../../types';

interface TaskBoardProps {
  tasks: Task[];
  onCreateTask: (data: { title: string; description?: string; status?: TaskStatus; priority?: TaskPriority }) => Promise<void>;
  onUpdateTask: (id: string, data: Partial<Task>) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
}

const columns: { id: TaskStatus; title: string; color: string }[] = [
  { id: 'pending', title: 'To Do', color: 'text-gray-400' },
  { id: 'in_progress', title: 'In Progress', color: 'text-accent' },
  { id: 'completed', title: 'Done', color: 'text-success' },
];

export function TaskBoard({ tasks, onCreateTask, onUpdateTask, onDeleteTask }: TaskBoardProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' as TaskPriority });
  const [creating, setCreating] = useState(false);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!newTask.title.trim()) return;
    setCreating(true);
    try {
      await onCreateTask(newTask);
      setNewTask({ title: '', description: '', priority: 'medium' });
      setShowCreate(false);
    } finally {
      setCreating(false);
    }
  };

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (status: TaskStatus) => {
    if (!draggedTask) return;
    await onUpdateTask(draggedTask, { status });
    setDraggedTask(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(column => {
          const columnTasks = tasks.filter(t => t.status === column.id);
          return (
            <div
              key={column.id}
              className="bg-surface/50 border border-surface-lighter rounded-xl p-3"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm font-semibold ${column.color}`}>{column.title}</h3>
                  <span className="text-xs text-gray-600 bg-surface-lighter px-1.5 py-0.5 rounded">
                    {columnTasks.length}
                  </span>
                </div>
                {column.id === 'pending' && (
                  <button
                    onClick={() => setShowCreate(true)}
                    className="p-1 text-gray-500 hover:text-accent hover:bg-accent/10 rounded transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                )}
              </div>
              <div className="space-y-2 min-h-[100px]">
                <AnimatePresence>
                  {columnTasks.map(task => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task.id)}
                    >
                      <TaskCard
                        task={task}
                        onUpdate={onUpdateTask}
                        onDelete={onDeleteTask}
                        isDragging={draggedTask === task.id}
                      />
                    </div>
                  ))}
                </AnimatePresence>
                {columnTasks.length === 0 && (
                  <div className="flex items-center justify-center h-24 text-gray-600 text-xs border-2 border-dashed border-surface-lighter rounded-lg">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Task">
        <div className="space-y-4">
          <Input
            label="Title"
            placeholder="Task title..."
            value={newTask.title}
            onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300">Description</label>
            <textarea
              className="w-full px-4 py-2.5 bg-surface border border-surface-lighter rounded-lg text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none h-20"
              placeholder="Optional description..."
              value={newTask.description}
              onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300">Priority</label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as TaskPriority[]).map(p => (
                <button
                  key={p}
                  onClick={() => setNewTask(prev => ({ ...prev, priority: p }))}
                  className={`flex-1 py-2 text-sm rounded-lg border capitalize transition-colors ${
                    newTask.priority === p
                      ? 'bg-accent/10 border-accent text-accent'
                      : 'bg-surface border-surface-lighter text-gray-400 hover:border-surface-lighter'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowCreate(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleCreate} loading={creating} className="flex-1">
              Create Task
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
