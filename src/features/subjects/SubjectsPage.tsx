import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Subject } from '../../types/index.js';
import Card from '../../components/ui/Card.js';
import SubjectDetails from './SubjectDetails.js';
import { useAuth } from '../../app/AuthContext.js';

const SubjectsPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const { user } = useAuth();

  // Get real class data
  const classes = JSON.parse(localStorage.getItem('classes') || '[]');
  const studentClass = classes.find((c: any) => c.code === user?.classCode);

  // Use real subjects from class or show empty state
  const subjects = studentClass ? studentClass.subjects : [];

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  const handleBack = () => {
    setSelectedSubject(null);
  };

  if (selectedSubject) {
    return (
      <motion.div className="space-y-6">
        <SubjectDetails subject={selectedSubject} onBack={handleBack} />
      </motion.div>
    );
  }

  return (
    <motion.div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-100">Subjects</h1>
        <p className="text-slate-400">
          {studentClass 
            ? `Subjects for ${studentClass.name}` 
            : 'No subjects available - join a class first'
          }
        </p>
      </div>

        {subjects.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No subjects available</h3>
              <p className="text-slate-400">
                {studentClass 
                  ? 'No subjects available. Ask admin to add subjects.'
                  : 'Join a class to see subjects here.'
                }
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {subjects.map((subject: any, index: number) => (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Card>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSubjectClick(subject)}
                      className="cursor-pointer"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-slate-400">Code</div>
                            <div className="text-lg font-semibold text-white">{subject.code}</div>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-white mb-2">{subject.name}</h3>
                        <p className="text-slate-400 text-sm mb-4">{subject.description}</p>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="text-slate-400">
                            <span className="font-medium">Instructor:</span> {subject.instructor}
                          </div>
                          <div className="text-slate-400">
                            <span className="font-medium">Credits:</span> {subject.credits}
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-slate-700">
                          <div className="text-sm text-slate-400">
                            <span className="font-medium">Schedule:</span> {subject.schedule}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
    </motion.div>
  );
};

export default SubjectsPage;
