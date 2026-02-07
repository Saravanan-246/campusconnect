import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;
