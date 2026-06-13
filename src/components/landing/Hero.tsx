import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-6">
            Manage your projects
            <br />
            <span className="gradient-text">without the chaos.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            TaskFlow helps teams and freelancers organize work,
            track progress, and ship faster. Simple, fast, beautiful.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl shadow-lg shadow-accent/25 transition-all duration-300 hover:shadow-accent/40 hover:-translate-y-0.5"
            >
              Get Started — it's free
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <button className="inline-flex items-center gap-2 px-6 py-3.5 text-gray-400 hover:text-white transition-colors">
              <Play size={16} />
              See how it works
            </button>
          </div>
        </motion.div>

        {/* App mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 relative"
        >
          <div className="relative rounded-xl border border-surface-lighter overflow-hidden shadow-2xl shadow-accent/10">
            <div className="bg-surface p-4 border-b border-surface-lighter flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-danger/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-surface-light rounded-md text-xs text-gray-500 font-mono">
                  app.taskflow.io/dashboard
                </div>
              </div>
            </div>
            <div className="bg-background p-8">
              <div className="grid grid-cols-4 gap-4">
                {/* Sidebar */}
                <div className="col-span-1 space-y-3">
                  <div className="h-8 bg-surface rounded-lg" />
                  <div className="h-6 bg-surface-light rounded w-3/4" />
                  <div className="h-6 bg-accent/20 rounded w-3/4" />
                  <div className="h-6 bg-surface-light rounded w-3/4" />
                </div>
                {/* Main content */}
                <div className="col-span-3 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-surface p-4 rounded-lg border border-surface-lighter">
                      <div className="h-4 bg-surface-lighter rounded w-1/2 mb-2" />
                      <div className="h-8 bg-accent/20 rounded w-1/3" />
                    </div>
                    <div className="bg-surface p-4 rounded-lg border border-surface-lighter">
                      <div className="h-4 bg-surface-lighter rounded w-1/2 mb-2" />
                      <div className="h-8 bg-success/20 rounded w-1/3" />
                    </div>
                    <div className="bg-surface p-4 rounded-lg border border-surface-lighter">
                      <div className="h-4 bg-surface-lighter rounded w-1/2 mb-2" />
                      <div className="h-8 bg-warning/20 rounded w-1/3" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-surface p-3 rounded-lg border border-surface-lighter space-y-2">
                      <div className="text-xs text-gray-500 font-medium mb-2">To Do</div>
                      <div className="h-16 bg-surface-light rounded" />
                      <div className="h-12 bg-surface-light rounded" />
                    </div>
                    <div className="bg-surface p-3 rounded-lg border border-surface-lighter space-y-2">
                      <div className="text-xs text-accent font-medium mb-2">In Progress</div>
                      <div className="h-20 bg-accent/5 border border-accent/20 rounded" />
                    </div>
                    <div className="bg-surface p-3 rounded-lg border border-surface-lighter space-y-2">
                      <div className="text-xs text-success font-medium mb-2">Done</div>
                      <div className="h-14 bg-success/5 border border-success/20 rounded" />
                      <div className="h-10 bg-success/5 border border-success/20 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-accent/10 blur-xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
