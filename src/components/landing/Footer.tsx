import { Link } from 'react-router-dom';
import { Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-surface-lighter py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold font-display text-white">
              Task<span className="text-accent">Flow</span>
            </Link>
            <p className="text-gray-400 text-sm mt-3 max-w-sm leading-relaxed">
              Simple, fast, beautiful project management for teams and freelancers.
              Ship faster without the chaos.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 font-display">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-white text-sm transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white text-sm transition-colors">Pricing</a></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white text-sm transition-colors">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 font-display">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-surface-light hover:bg-surface-lighter rounded-lg text-gray-400 hover:text-white transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="p-2 bg-surface-light hover:bg-surface-lighter rounded-lg text-gray-400 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-surface-lighter pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2024 TaskFlow. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
