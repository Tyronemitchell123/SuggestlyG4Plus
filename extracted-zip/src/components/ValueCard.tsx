import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ValueCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'indigo';
  delay?: number;
  features?: string[];
  stats?: Array<{ value: string; label: string }>;
}

const ValueCard: React.FC<ValueCardProps> = ({
  title,
  description,
  icon: Icon,
  color = 'blue',
  delay = 0,
  features = [],
  stats = null,
}) => {
  const colorVariants = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

  const iconColors = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    orange: 'text-orange-500',
    red: 'text-red-500',
    indigo: 'text-indigo-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Header with gradient */}
      <div
        className={`bg-gradient-to-r ${colorVariants[color]} p-6 text-white`}
      >
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-white/20 backdrop-blur-sm`}>
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

        {/* Features */}
        {features.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <CheckCircle className={`w-4 h-4 mr-2 ${iconColors[color]}`} />
              Key Features
            </h4>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-600 flex items-center"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full mr-2 bg-${color}-400`}
                  ></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Stats */}
        {stats && (
          <div className="border-t border-gray-100 pt-4">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl font-bold ${iconColors[color]}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 pb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full bg-gradient-to-r ${colorVariants[color]} text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200`}
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ValueCard;
