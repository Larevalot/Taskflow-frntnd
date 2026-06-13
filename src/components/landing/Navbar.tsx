import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-surface-lighter' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold font-display text-white">
          Task<span className="text-accent">Flow</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-400 hover:text-white text-sm transition-colors">Features</a>
          <a href="#pricing" className="text-gray-400 hover:text-white text-sm transition-colors">Pricing</a>
          <Link to="/login" className="text-gray-400 hover:text-white text-sm transition-colors">Login</Link>
          <Link
            to="/register"
            className="px-5 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-gray-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-surface-lighter p-6 space-y-4">
          <a href="#features" className="block text-gray-300 hover:text-white" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#pricing" className="block text-gray-300 hover:text-white" onClick={() => setMobileOpen(false)}>Pricing</a>
          <Link to="/login" className="block text-gray-300 hover:text-white" onClick={() => setMobileOpen(false)}>Login</Link>
          <Link
            to="/register"
            className="block w-full text-center py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg"
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
