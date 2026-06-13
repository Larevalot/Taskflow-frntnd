import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Freelance Designer',
    avatar: 'SC',
    content: 'TaskFlow replaced 3 different tools for me. The interface is beautiful and it actually makes project management enjoyable.',
    rating: 5,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Startup Founder',
    avatar: 'MR',
    content: 'We migrated from Trello and never looked back. The dashboard stats alone are worth it. Clean, fast, no bloat.',
    rating: 5,
  },
  {
    name: 'Aisha Patel',
    role: 'Dev Team Lead',
    avatar: 'AP',
    content: 'Finally a project tool that doesn\'t try to do everything. TaskFlow does task management perfectly. Our team loves it.',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Loved by <span className="gradient-text">productive people</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Join thousands of users who simplified their workflow with TaskFlow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-surface border border-surface-lighter rounded-xl"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-warning text-warning" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-semibold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
