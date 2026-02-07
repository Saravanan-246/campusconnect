import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { userRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // If user is not logged in, redirect to welcome page
  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  // If user tries to access admin routes but is not admin
  if (requiredRole === 'admin' && userRole !== 'admin') {
    return <Navigate to="/student/login" replace />;
  }

  // If user tries to access student routes but is not student
  if (requiredRole === 'student' && userRole !== 'student') {
    return <Navigate to="/admin/login" replace />;
  }

  // If role doesn't match required role
  if (requiredRole && userRole !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
