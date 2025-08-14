import React from 'react';

interface ValueCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  className?: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon: Icon, title, description, className = '' }) => {
  return (
    <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="w-6 h-6 text-gold" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default ValueCard;
