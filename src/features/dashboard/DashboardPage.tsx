import React from 'react';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';

interface DashboardCard {
  id: string;
  title: string;
  value: number | string;
  description: string;
  icon: string;
  color: string;
  trend?: 'up' | 'down';
  trendValue?: string;
}

interface DashboardPageProps {
  onAdminAccess?: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onAdminAccess }) => {
  // Get user and classes data
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const classes = JSON.parse(localStorage.getItem("classes") || "[]");
  
  // Find current class
  const currentClass = classes.find(
    (cls: any) => cls.code === userData.classCode
  );

  // Handle no class case
  if (!currentClass) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
        <h2 className="text-xl text-slate-100 mb-2">No class joined</h2>
        <p className="text-slate-400">
          Join a class to see your dashboard data.
        </p>
      </div>
    );
  }

  // Calculate stats based on real data
  const stats: DashboardCard[] = [
    {
      id: '1',
      title: 'Total Subjects',
      value: currentClass.subjects?.length || 0,
      description: 'Number of subjects in your class',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      color: 'blue'
    },
    {
      id: '2',
      title: 'Total Events',
      value: currentClass.events?.length || 0,
      description: 'Number of events in your class',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      color: 'emerald'
    },
    {
      id: '3',
      title: 'Total Students',
      value: currentClass.students?.length || 0,
      description: 'Number of students in your class',
      icon: 'M12 4.354a4 4 0 110 8 0 4 4 0 010-8zm0 0V21M12 4.354a4 4 0 110 8 0 4 4 0 010-8zm0 0V21',
      color: 'purple'
    },
    {
      id: '4',
      title: 'Class Code',
      value: currentClass.code || 'N/A',
      description: 'Your class code',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      color: 'orange'
    }
  ];

  // Get real upcoming events
  const upcomingEvents = currentClass.events?.slice(0, 3) || [];

  // Get real recent activities from class events
  const recentActivities = upcomingEvents.map((event, index) => ({
    id: event.id,
    title: `Event: ${event.title}`,
    time: event.date,
    type: 'event'
  }));

  return (
    <motion.div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-100">
          Student Dashboard
        </h1>
        <p className="text-slate-400">
          Welcome back, {userData.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat: DashboardCard, index: number) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 text-sm font-medium">{stat.title}</h3>
                <span
                  className={`text-xs font-medium ${
                    stat.trend === 'up'
                      ? 'text-emerald-500'
                      : stat.trend === 'down'
                      ? 'text-red-500'
                      : 'text-slate-500'
                  }`}
                >
                  {stat.trendValue}
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-100 mb-2">{stat.value}</div>
              <p className="text-slate-400 text-sm">{stat.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {onAdminAccess && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Admin Access</h3>
                <p className="text-slate-400 text-sm">Access the admin panel to manage events and materials</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAdminAccess}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Admin Panel</span>
              </motion.button>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Recent Activities</h3>
            <div className="space-y-3">
              {recentActivities.map((activity: any, index: number) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === 'assignment'
                          ? 'bg-blue-400'
                          : activity.type === 'lecture'
                          ? 'bg-green-400'
                          : activity.type === 'discussion'
                          ? 'bg-purple-400'
                          : 'bg-yellow-400'
                      }`}
                    ></div>
                    <span className="text-slate-300 text-sm">{activity.title}</span>
                  </div>
                  <span className="text-slate-500 text-xs">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event: any, index: number) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
                >
                  <div>
                    <p className="text-slate-300 text-sm font-medium">{event.title}</p>
                    <p className="text-slate-500 text-xs">{event.date} at {event.time}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      event.type === 'exam'
                        ? 'bg-red-100 text-red-600'
                        : event.type === 'lab'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-green-100 text-green-600'
                    }`}
                  >
                    {event.type}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
