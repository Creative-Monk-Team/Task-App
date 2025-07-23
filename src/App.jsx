import React from 'react';

import { AuthProvider, useAuth } from './contexts/AuthContext'; // Added useAuth import
import { AppProvider } from './contexts/AppContext';
import { Layout } from './components/Layout/Layout';
import { LoginForm } from './components/Auth/LoginForm';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ProjectsView } from './components/Projects/ProjectsView';
import { TasksView } from './components/Tasks/TasksView';
import { useApp } from './contexts/AppContext';

const AppContent = () => {
  const { user, isLoading } = useAuth();
  const { currentView } = useApp();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-app">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-text-on-primary font-bold text-2xl">B</span>
          </div>
          <p className="text-text-secondary">Loading Bolt...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <ProjectsView />;
      case 'tasks':
        return <TasksView />;
      case 'time':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Time Tracking</h1>
            <p className="text-gray-600 mt-2">Time tracking view coming soon...</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 mt-2">Reports and analytics coming soon...</p>
          </div>
        );
      case 'clients':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Client Portal</h1>
            <p className="text-gray-600 mt-2">Client portal management coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return <Layout>{renderCurrentView()}</Layout>;
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
