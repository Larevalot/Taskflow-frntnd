import { useState, useEffect } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import type { TaskStatus, TaskPriority } from '../../types';

interface SearchBarProps {
  onFilterChange: (filters: { status?: TaskStatus; priority?: TaskPriority; search?: string }) => void;
}

export function SearchBar({ onFilterChange }: SearchBarProps) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<TaskStatus | ''>('');
  const [priority, setPriority] = useState<TaskPriority | ''>('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({
        search: search || undefined,
        status: status || undefined,
        priority: priority || undefined,
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, status, priority, onFilterChange]);

  const clearFilters = () => {
    setSearch('');
    setStatus('');
    setPriority('');
  };

  const hasFilters = search || status || priority;

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-surface border border-surface-lighter rounded-lg text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-3 py-2.5 border rounded-lg text-sm transition-colors ${
            showFilters || hasFilters
              ? 'bg-accent/10 border-accent/30 text-accent'
              : 'bg-surface border-surface-lighter text-gray-400 hover:text-white'
          }`}
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="flex gap-3 flex-wrap">
          <select
            value={status}
            onChange={e => setStatus(e.target.value as TaskStatus | '')}
            className="px-3 py-1.5 bg-surface border border-surface-lighter rounded-lg text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={priority}
            onChange={e => setPriority(e.target.value as TaskPriority | '')}
            className="px-3 py-1.5 bg-surface border border-surface-lighter rounded-lg text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}
