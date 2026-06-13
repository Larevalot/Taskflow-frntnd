import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Settings, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  onNewProject?: () => void;
}

export function Sidebar({ onNewProject }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const links = [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/dashboard/projects', icon: <FolderKanban size={18} />, label: 'Projects' },
    { to: '/dashboard/settings', icon: <Settings size={18} />, label: 'Settings' },
  ];

  return (
    <aside className="w-64 h-screen bg-surface border-r border-surface-lighter flex flex-col fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-surface-lighter">
        <NavLink to="/dashboard" className="text-xl font-bold font-display text-white">
          Task<span className="text-accent">Flow</span>
        </NavLink>
      </div>

      <div className="p-4">
        <button
          onClick={onNewProject}
          className="w-full flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-gray-400 hover:text-white hover:bg-surface-light'
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-surface-lighter">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-semibold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-medium truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-danger hover:bg-danger/5 rounded-lg transition-colors"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
