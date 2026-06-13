import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    description: 'Perfect for personal projects and getting started.',
    features: ['Up to 5 projects', 'Unlimited tasks', 'Basic statistics', 'Dark mode', 'Mobile responsive'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/mo',
    description: 'For professionals and teams who need more power.',
    features: ['Unlimited projects', 'Unlimited tasks', 'Advanced analytics', 'Priority support', 'Custom colors', 'Export data'],
    cta: 'Start Pro Trial',
    popular: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Start for free, upgrade when you need more. No hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative p-8 rounded-xl border ${
                plan.popular
                  ? 'bg-surface border-accent shadow-lg shadow-accent/10'
                  : 'bg-surface border-surface-lighter'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white font-display">{plan.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{plan.description}</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white font-display">{plan.price}</span>
                <span className="text-gray-400">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check size={16} className="text-success flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/20'
                    : 'bg-surface-light hover:bg-surface-lighter text-gray-200 border border-surface-lighter'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
