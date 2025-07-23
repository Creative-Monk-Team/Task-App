import React, { useState } from 'react';
import {
  XIcon,
  CalendarIcon,
  DollarSignIcon,
  UsersIcon,
  ClockIcon,
  BarChart3Icon,
  MessageSquareIcon,
  FileIcon,
  SettingsIcon,
  EditIcon,
  TrashIcon,
  PlayIcon,
  PauseIcon
} from 'lucide-react';
import clsx from 'clsx';

export const ProjectDetailModal = ({ project, onClose, onProjectUpdated, onProjectDeleted }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    return status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Mock stats
  const projectStats = {
    progress: 65,
    tasksCompleted: 8,
    totalTasks: 12,
    hoursTracked: 45.5,
    estimatedHours: 80,
    budgetSpent: project.budget ? project.budget * 0.65 : 0,
    teamMembers: 4,
    filesUploaded: 23,
    lastActivity: new Date()
  };

  const recentActivity = [
    {
      id: 1,
      user: 'Sarah Chen',
      action: 'completed task',
      target: 'Homepage Design',
      time: '2 hours ago'
    },
    {
      id: 2,
      user: 'Mike Johnson',
      action: 'uploaded file',
      target: 'SEO Report.pdf',
      time: '4 hours ago'
    },
    {
      id: 3,
      user: 'Emily Rodriguez',
      action: 'updated status',
      target: 'Project Timeline',
      time: '1 day ago'
    }
  ];

  const handleTimerToggle = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleDeleteProject = () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      onProjectDeleted();
    }
  };

  // 👇 Define render functions here ⤵️ (shortened for brevity if needed)
 
 
 const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Project Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Progress</p>
              <p className="text-2xl font-bold text-blue-900">{projectStats.progress}%</p>
            </div>
            <BarChart3Icon className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Tasks</p>
              <p className="text-2xl font-bold text-green-900">{projectStats.tasksCompleted}/{projectStats.totalTasks}</p>
            </div>
            <ClockIcon className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Hours</p>
              <p className="text-2xl font-bold text-purple-900">{projectStats.hoursTracked}h</p>
            </div>
            <ClockIcon className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Budget</p>
              <p className="text-2xl font-bold text-orange-900">
                {project.budget ? `${Math.round((projectStats.budgetSpent / project.budget) * 100)}%` : 'N/A'}
              </p>
            </div>
            <DollarSignIcon className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Progress Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Progress</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Overall Progress</span>
              <span className="font-medium text-gray-900">{projectStats.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${projectStats.progress}%` }}
              />
            </div>
          </div>

          {project.budget && (
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Budget Used</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(projectStats.budgetSpent)} / {formatCurrency(project.budget)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(projectStats.budgetSpent / project.budget) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Time Tracked</span>
              <span className="font-medium text-gray-900">
                {projectStats.hoursTracked}h / {projectStats.estimatedHours}h
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(projectStats.hoursTracked / projectStats.estimatedHours) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


  const renderTasksTab = () => (
    <div className="text-center py-8">
      <ClockIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Project Tasks</h3>
      <p className="text-gray-600">Task management interface would be integrated here</p>
    </div>
  );

  const renderTimeTab = () => (
    <div className="text-center py-8">
      <ClockIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Time Tracking</h3>
      <p className="text-gray-600">Detailed time entries will go here</p>
    </div>
  );

  const renderBudgetTab = () => (
    <div className="text-center py-8">
      <DollarSignIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Budget</h3>
      <p className="text-gray-600">Budget information goes here</p>
    </div>
  );

  const renderTeamTab = () => (
    <div className="text-center py-8">
      <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Team</h3>
      <p className="text-gray-600">Team info here</p>
    </div>
  );

  const renderFilesTab = () => (
    <div className="text-center py-8">
      <FileIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Files</h3>
      <p className="text-gray-600">File list here</p>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Project Settings</h3>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Danger Zone</h4>
        <div className="space-y-3">
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <EditIcon className="w-4 h-4 mr-2" />
            Edit Project
          </button>
          <button
            onClick={handleDeleteProject}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete Project
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {project.space && (
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: project.space.color }}
              />
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{project.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span
                  className={clsx(
                    'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                    getStatusColor(project.status)
                  )}
                >
                  {getStatusText(project.status)}
                </span>
                <span className="text-sm text-gray-500">
                  {project.folder?.clientName || 'Internal'}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex h-[calc(90vh-80px)]">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 bg-gray-50">
            <nav className="p-4 space-y-1">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3Icon },
                { id: 'tasks', label: 'Tasks', icon: ClockIcon },
                { id: 'time', label: 'Time Tracking', icon: ClockIcon },
                { id: 'budget', label: 'Budget', icon: DollarSignIcon },
                { id: 'team', label: 'Team', icon: UsersIcon },
                { id: 'files', label: 'Files', icon: FileIcon },
                { id: 'settings', label: 'Settings', icon: SettingsIcon }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={clsx(
                      'w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main content area */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'tasks' && renderTasksTab()}
            {activeTab === 'time' && renderTimeTab()}
            {activeTab === 'budget' && renderBudgetTab()}
            {activeTab === 'team' && renderTeamTab()}
            {activeTab === 'files' && renderFilesTab()}
            {activeTab === 'settings' && renderSettingsTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

