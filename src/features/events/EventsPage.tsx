import React from 'react';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card.js';

import { useAuth } from '../../app/AuthContext.js';
const EventsPage: React.FC = () => {

  const { user } = useAuth();

  // Get real class data
  const classes = JSON.parse(localStorage.getItem('classes') || '[]');
  const studentClass = classes.find((c: any) => c.code === user?.classCode);

  // Use real events from class or show empty state
  const events = studentClass ? studentClass.events : [];

  return (
    <motion.div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-100">Events</h1>
        <p className="text-slate-400">
          {studentClass 
            ? `Events for ${studentClass.name}` 
            : 'No events available - join a class first'
          }
        </p>
      </div>

        {events.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No events available</h3>
              <p className="text-slate-400">
                {studentClass 
                  ? 'Your instructor hasn\'t added any events yet.'
                  : 'Join a class to see events here.'
                }
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: any, index: number) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Card>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-400">{event.date}</div>
                        <div className="text-lg font-semibold text-white">{event.time}</div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{event.description}</p>
                    
                    <div className="flex items-center justify-between text-sm mb-3">
                      <div className="text-slate-400">
                        <span className="font-medium">Location:</span> {event.location}
                      </div>
                      <div className="text-slate-400">
                        <span className="font-medium">Type:</span> {event.type}
                      </div>
                    </div>
                    
                    <div className="text-sm text-slate-400">
                      <span className="font-medium">Organizer:</span> {event.organizer}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
    </motion.div>
  );
};

export default EventsPage;
