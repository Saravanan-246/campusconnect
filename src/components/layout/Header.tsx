import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  title: string;
  userName?: string;
  onMobileMenuToggle?: () => void;
  showMobileMenuButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  userName = 'John Doe', 
  onMobileMenuToggle,
  showMobileMenuButton = false 
}) => {

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full bg-slate-900 border-b border-slate-800 px-6 py-4 transition-colors duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showMobileMenuButton && (
            <motion.button
              onClick={onMobileMenuToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
          )}
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-100">{title}</h1>
            <p className="text-slate-400 text-sm mt-1 hidden sm:block">Welcome back, {userName}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:block p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors relative"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </motion.button>

          <div className="hidden sm:flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-100">{userName}</p>
              <p className="text-xs text-slate-400">Student</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm lg:font-semibold"
            >
              {userName.charAt(0)}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
