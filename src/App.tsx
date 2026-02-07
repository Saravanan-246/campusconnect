import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './app/AuthContext';
import { AuthProvider } from './app/AuthContext';
import ProtectedRoute from './app/ProtectedRoute';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './features/dashboard/DashboardPage';
import EventsPage from './features/events/EventsPage';
import SubjectsPage from './features/subjects/SubjectsPage';
import ProfilePage from './features/profile/ProfilePage';
import AdminLogin from './features/admin/AdminLogin';
import AdminDashboard from './features/admin/AdminDashboard';
import CreateEvent from './features/admin/CreateEvent';
import AddMaterial from './features/admin/AddMaterial';
import CreateClass from './features/admin/CreateClass';
import Welcome from './features/auth/Welcome';
import StudentSignup from './features/auth/StudentSignup';
import StudentLogin from './features/auth/StudentLogin';
import JoinClass from './features/auth/JoinClass';

const AppContent: React.FC = () => {
  const { userRole, user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = React.useState<string>('dashboard');
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState<boolean>(false);
  const [adminView, setAdminView] = React.useState<string>('dashboard');

    // Show loading spinner while checking auth
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

  const studentNavItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      path: '/dashboard',
    },
    {
      id: 'events',
      label: 'Events',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      path: '/events',
    },
    {
      id: 'subjects',
      label: 'Subjects',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      path: '/subjects',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      path: '/profile',
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
      path: '/logout',
    },
  ];

  const adminNavItems = [
    {
      id: 'admin-dashboard',
      label: 'Admin Dashboard',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      path: '/admin/dashboard',
    },
    {
      id: 'create-event',
      label: 'Create Event',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      path: '/admin/create-event',
    },
    {
      id: 'add-material',
      label: 'Add Material',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      path: '/admin/add-material',
    },
    {
      id: 'create-class',
      label: 'Create Class',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      path: '/admin/create-class',
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
      path: '/logout',
    },
  ];

  const currentNavItems = userRole === 'admin' ? adminNavItems : studentNavItems;

  const getPageTitle = () => {
    if (userRole === 'admin') {
      switch (adminView) {
        case 'dashboard':
          return 'Admin Dashboard';
        case 'create-event':
          return 'Create Event';
        case 'add-material':
          return 'Add Material';
        case 'create-class':
          return 'Create Class';
        default:
          return 'Admin Dashboard';
      }
    } else {
      const item = studentNavItems.find(item => item.id === activeItem);
      return item ? item.label : 'Dashboard';
    }
  };

  const handleNavItemClick = (id: string) => {
    if (id === 'logout') {
      logout();
      navigate('/');
      return;
    } else if (userRole === 'admin') {
      const viewMap: Record<string, string> = {
        'admin-dashboard': 'dashboard',
        'create-event': 'create-event',
        'add-material': 'add-material',
        'create-class': 'create-class',
      };
      setAdminView(viewMap[id] || 'dashboard');
    } else {
      setActiveItem(id);
    }
    setIsMobileMenuOpen(false);
  };

  const renderAdminContent = () => {
    switch (adminView) {
      case 'dashboard':
        return (
          <AdminDashboard
            onCreateEvent={() => setAdminView('create-event')}
            onAddMaterial={() => setAdminView('add-material')}
            onCreateClass={() => setAdminView('create-class')}
          />
        );
      case 'create-event':
        return <CreateEvent onBack={() => setAdminView('dashboard')} />;
      case 'add-material':
        return <AddMaterial onBack={() => setAdminView('dashboard')} />;
      case 'create-class':
        return <CreateClass onBack={() => setAdminView('dashboard')} />;
      default:
        return (
          <AdminDashboard
            onCreateEvent={() => setAdminView('create-event')}
            onAddMaterial={() => setAdminView('add-material')}
            onCreateClass={() => setAdminView('create-class')}
          />
        );
    }
  };

  const renderStudentContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <DashboardPage />;
      case 'events':
        return <EventsPage />;
      case 'subjects':
        return <SubjectsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DashboardPage />;
    }
  };

  // If user is logged in, show the main app layout
  if (user) {
    return (
      <div className="flex min-h-screen w-full bg-slate-950 text-slate-100">
        {/* Mobile sidebar overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile sidebar */}
        <div className="lg:hidden fixed z-40">
          <Sidebar
            items={currentNavItems}
            activeItem={userRole === 'admin' ? `admin-${adminView}` : activeItem}
            onItemClick={handleNavItemClick}
            isCollapsed={false}
            onToggleCollapse={() => setIsMobileMenuOpen(false)}
            isMobileMenuOpen={isMobileMenuOpen}
          />
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            items={currentNavItems}
            activeItem={userRole === 'admin' ? `admin-${adminView}` : activeItem}
            onItemClick={handleNavItemClick}
            isCollapsed={isCollapsed}
            onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
            isMobileMenuOpen={false}
          />
        </div>
        
        <main className="flex-1 bg-slate-900 p-4 md:p-6 overflow-y-auto">
          <Header 
            title={getPageTitle()} 
            userName={user?.name || 'User'}
            onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            showMobileMenuButton={true}
          />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={userRole === 'admin' ? `admin-${adminView}` : activeItem}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
            >
              {userRole === 'admin' ? renderAdminContent() : renderStudentContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    );
  }

  // If not logged in, show routes based on auth context
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/student/signup" element={<StudentSignup />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      
      {/* Protected routes */}
      <Route path="/join-class" element={
        <ProtectedRoute requiredRole="student">
          <JoinClass />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute requiredRole="student">
          <DashboardPage />
        </ProtectedRoute>
      } />
      
      <Route path="/events" element={
        <ProtectedRoute requiredRole="student">
          <EventsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/subjects" element={
        <ProtectedRoute requiredRole="student">
          <SubjectsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute requiredRole="student">
          <ProfilePage />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/dashboard" element={
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard 
            onCreateEvent={() => setAdminView('create-event')}
            onAddMaterial={() => setAdminView('add-material')}
            onCreateClass={() => setAdminView('create-class')}
          />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/create-event" element={
        <ProtectedRoute requiredRole="admin">
          <CreateEvent onEventCreated={() => setAdminView('dashboard')} onBack={() => setAdminView('dashboard')} />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/add-material" element={
        <ProtectedRoute requiredRole="admin">
          <AddMaterial onMaterialAdded={() => setAdminView('dashboard')} onBack={() => setAdminView('dashboard')} subjects={[]} />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/create-class" element={
        <ProtectedRoute requiredRole="admin">
          <CreateClass onBack={() => setAdminView('dashboard')} />
        </ProtectedRoute>
      } />
      
      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
