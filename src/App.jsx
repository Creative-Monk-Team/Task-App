import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { AppProvider, useApp } from './contexts/AppContext.jsx';
import { Layout } from './components/Layout/Layout.jsx';
import { LoginForm } from './components/Auth/LoginForm';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ProjectsView } from './components/Projects/ProjectsView';
import { TasksView } from './components/Tasks/TasksView';
import { ClientsView } from './components/Clients/ClientsView.jsx';
import { ReportsView } from './components/Reports/ReportsView';
import { ClientPortalLogin } from './components/ClientPortal/ClientPortalLogin';
import { ClientPortalDashboard } from './components/ClientPortal/ClientPortalDashboard.jsx';

// Mock client data for demo
const mockClient = {
  id: '1',
  name: 'John Smith',
  email: 'john@techcorp.com',
  company: 'TechCorp Inc.',
  phone: '+1 (555) 123-4567',
  status: 'active',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-20'),
  lastLogin: new Date('2024-01-19'),
  workspaceId: 'workspace-1',
  portalAccess: true,
  portalTheme: {
    primaryColor: '#f97316'
  },
  accessibleProjects: ['project-1', 'project-2'],
  website: 'https://techcorp.com'
};

const AppContent = () => {
  const { user, isLoading } = useAuth();
  const { currentView } = useApp();
  const [isClientPortal, setIsClientPortal] = React.useState(false);
  const [clientUser, setClientUser] = React.useState(null);

  // Check if we're in client portal mode (could be based on subdomain or URL path)
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('portal') === 'client') {
      setIsClientPortal(true);
    }
  }, []);

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

  // Client Portal Flow
  if (isClientPortal) {
    if (!clientUser) {
      return <ClientPortalLogin onLogin={(email) => setClientUser(mockClient)} />;
    }
    return <ClientPortalDashboard client={clientUser} />;
  }

  // Regular App Flow
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
      case 'clients':
        return <ClientsView />;
      case 'reports':
        return <ReportsView />;
      case 'time':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Time Tracking</h1>
            <p className="text-gray-600 mt-2">Time tracking view coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderCurrentView()}
    </Layout>
  );
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