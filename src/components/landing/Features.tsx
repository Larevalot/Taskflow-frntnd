import { motion } from 'framer-motion';
import { LayoutDashboard, Zap, BarChart3, Shield, Palette, Rocket } from 'lucide-react';

const features = [
  {
    icon: <LayoutDashboard size={24} />,
    title: 'Project Boards',
    description: 'Organize tasks by project with visual boards that keep everything in sight.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Lightning Fast',
    description: 'Built with modern tech for instant interactions. No loading spinners.',
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'Progress Tracking',
    description: 'See your stats at a glance with clean, beautiful dashboards.',
  },
  {
    icon: <Shield size={24} />,
    title: 'Secure Auth',
    description: 'Your data is protected with JWT authentication and encrypted passwords.',
  },
  {
    icon: <Palette size={24} />,
    title: 'Beautiful UI',
    description: 'A tool you\'ll actually enjoy using every day. Dark mode included.',
  },
  {
    icon: <Rocket size={24} />,
    title: 'Ship Faster',
    description: 'Stop managing tools, start managing work. Get more done, faster.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Everything you need,
            <span className="gradient-text"> nothing you don't</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Simple enough to start using in seconds, powerful enough to manage complex projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 bg-surface border border-surface-lighter rounded-xl hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-accent/10 text-accent rounded-xl mb-4 group-hover:bg-accent/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 font-display">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
