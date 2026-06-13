import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '../components/dashboard/Sidebar';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export function Settings() {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-2xl font-bold font-display text-white mb-2">Settings</h1>
          <p className="text-gray-400 mb-8">Manage your account preferences.</p>

          <div className="space-y-6">
            <div className="bg-surface border border-surface-lighter rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white font-display mb-4">Profile</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent text-2xl font-bold font-display">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-medium">{user?.name}</p>
                    <p className="text-gray-500 text-sm">{user?.email}</p>
                  </div>
                </div>
                <Input
                  label="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <Input
                  label="Email"
                  value={user?.email || ''}
                  disabled
                />
                {saved && (
                  <p className="text-sm text-success">Settings saved successfully!</p>
                )}
                <Button type="submit">Save Changes</Button>
              </form>
            </div>

            <div className="bg-surface border border-surface-lighter rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white font-display mb-4">Danger Zone</h2>
              <p className="text-gray-400 text-sm mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="danger">Delete Account</Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
