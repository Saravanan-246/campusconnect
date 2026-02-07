import React from 'react';
import { motion } from 'framer-motion';
import type { Material } from '../../../types';

interface MaterialItemProps {
  material: Material;
}

const MaterialItem: React.FC<MaterialItemProps> = ({ material }) => {
  const handleOpenMaterial = () => {
    if (material.type === 'pdf') {
      window.open(material.url, '_blank');
    } else if (material.type === 'youtube') {
      window.open(material.url, '_blank');
    }
  };

  const getTypeIcon = () => {
    if (material.type === 'pdf') {
      return (
        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M8 11a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1-3a1 1 0 100 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    }
  };

  const getTypeColor = () => {
    return material.type === 'pdf' 
      ? 'bg-red-900 text-red-300' 
      : 'bg-red-600 text-white';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-gray-800 rounded-lg border border-gray-700 p-4 hover:border-gray-600 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-700 rounded-lg">
            {getTypeIcon()}
          </div>
          <div className="flex-1">
            <h4 className="text-white font-medium mb-1">{material.title}</h4>
            <p className="text-gray-400 text-sm">{material.description}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getTypeColor()}`}>
          {material.type.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-xs">
          {material.uploadDate}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenMaterial}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors flex items-center space-x-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span>Open</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MaterialItem;
