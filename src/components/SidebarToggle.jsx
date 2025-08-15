import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const SidebarToggle = ({ isOpen, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 transition-all duration-300 hover:scale-110"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default SidebarToggle;
