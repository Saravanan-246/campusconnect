import React from 'react';
import { motion } from 'framer-motion';
import type { Subject } from '../../types';
import Card from '../../components/ui/Card';
import MaterialItem from './components/MaterialItem';

interface SubjectDetailsProps {
  subject: Subject;
  onBack: () => void;
}

const SubjectDetails: React.FC<SubjectDetailsProps> = ({ subject, onBack }) => {
  const getGradeColor = (grade?: string) => {
    if (!grade) return 'bg-gray-700 text-slate-300';
    
    const gradeValue = grade.charAt(0);
    switch (gradeValue) {
      case 'A':
        return 'bg-green-900 text-green-300';
      case 'B':
        return 'bg-blue-900 text-blue-300';
      case 'C':
        return 'bg-yellow-900 text-yellow-300';
      case 'D':
        return 'bg-orange-900 text-orange-300';
      case 'F':
        return 'bg-red-900 text-red-300';
      default:
        return 'bg-gray-700 text-slate-300';
    }
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-400';
    if (attendance >= 80) return 'text-yellow-400';
    if (attendance >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const materialsByType = {
    pdf: subject.materials.filter(m => m.type === 'pdf'),
    youtube: subject.materials.filter(m => m.type === 'youtube'),
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      <div className="mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="mb-4 flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Subjects</span>
        </motion.button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{subject.name}</h1>
            <p className="text-slate-400 text-lg">{subject.code}</p>
            <p className="text-slate-500 mt-2">{subject.description}</p>
          </div>
          <span className={`px-4 py-2 text-sm rounded-full font-medium ${getGradeColor(subject.grade)}`}>
            {subject.grade || 'N/A'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">Course Information</h3>
            <div className="space-y-3">
              <div className="flex items-center text-slate-300">
                <svg className="w-4 h-4 mr-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{subject.instructor}</span>
              </div>
              <div className="flex items-center text-slate-300">
                <svg className="w-4 h-4 mr-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{subject.schedule}</span>
              </div>
              <div className="flex items-center text-slate-300">
                <svg className="w-4 h-4 mr-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{subject.credits} Credits</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Attendance</span>
                  <span className={`text-sm font-medium ${getAttendanceColor(subject.attendance)}`}>
                    {subject.attendance}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${subject.attendance}%` }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className={`h-full ${
                      subject.attendance >= 90
                        ? 'bg-green-500'
                        : subject.attendance >= 80
                        ? 'bg-yellow-500'
                        : subject.attendance >= 70
                        ? 'bg-orange-500'
                        : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{subject.materials.length}</div>
                <p className="text-slate-400 text-sm">Study Materials</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">Materials Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-300">PDF Documents</span>
                </div>
                <span className="text-white font-medium">{materialsByType.pdf.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span className="text-slate-300">YouTube Videos</span>
                </div>
                <span className="text-white font-medium">{materialsByType.youtube.length}</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Study Materials</h2>
        
        {subject.materials.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-slate-400 text-lg">No study materials available yet</p>
              <p className="text-slate-500 text-sm mt-2">Check back later for updates</p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subject.materials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <MaterialItem material={material} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SubjectDetails;
