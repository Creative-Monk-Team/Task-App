import React, { useState } from 'react';
import { 
  FolderIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  AlertCircleIcon,
  FileIcon,
  MessageSquareIcon,
  DownloadIcon,
  EyeIcon,
  ThumbsUpIcon,
  XCircleIcon,
  UploadIcon,
  SendIcon,
  CalendarIcon,
  BarChart3Icon,
  UserIcon
} from 'lucide-react';
import clsx from 'clsx';


// Mock data for client portal
const mockProjects = [
  {
    id: '1',
    name: 'Website Redesign',
    status: 'in_progress',
    progress: 75,
    dueDate: new Date('2024-03-15'),
    description: 'Complete redesign of company website with modern UI/UX',
    budget: 45000,
    spent: 33750,
    hoursTracked: 45.5,
    estimatedHours: 80
  },
  {
    id: '2',
    name: 'Brand Guidelines',
    status: 'client_review',
    progress: 90,
    dueDate: new Date('2024-02-28'),
    description: 'Comprehensive brand identity guidelines document',
    budget: 15000,
    spent: 13500,
    hoursTracked: 28.2,
    estimatedHours: 30
  },
  {
    id: '3',
    name: 'SEO Optimization',
    status: 'completed',
    progress: 100,
    dueDate: new Date('2024-02-15'),
    description: 'Complete SEO audit and optimization implementation',
    budget: 8000,
    spent: 7800,
    hoursTracked: 32.1,
    estimatedHours: 32
  }
];

const mockTasks = [
  {
    id: '1',
    title: 'Homepage Design Review',
    project: 'Website Redesign',
    status: 'client_review',
    dueDate: new Date('2024-02-25'),
    description: 'Please review the new homepage design and provide feedback on layout, colors, and content placement.',
    attachments: ['Homepage_Design_v3.pdf', 'Style_Guide.pdf']
  },
  {
    id: '2',
    title: 'Logo Variations Approval',
    project: 'Brand Guidelines',
    status: 'client_review',
    dueDate: new Date('2024-02-22'),
    description: 'Approve final logo variations for different use cases including horizontal, vertical, and icon versions.',
    attachments: ['Logo_Variations.pdf']
  }
];

const mockFiles = [
  {
    id: '1',
    name: 'Homepage_Design_v3.pdf',
    size: '2.4 MB',
    uploadedAt: new Date('2024-02-20'),
    project: 'Website Redesign',
    type: 'design'
  },
  {
    id: '2',
    name: 'Brand_Guidelines_Draft.pdf',
    size: '5.1 MB',
    uploadedAt: new Date('2024-02-18'),
    project: 'Brand Guidelines',
    type: 'document'
  },
  {
    id: '3',
    name: 'SEO_Report_Final.pdf',
    size: '3.2 MB',
    uploadedAt: new Date('2024-02-15'),
    project: 'SEO Optimization',
    type: 'report'
  },
  {
    id: '4',
    name: 'Wireframes_Mobile.pdf',
    size: '1.8 MB',
    uploadedAt: new Date('2024-02-12'),
    project: 'Website Redesign',
    type: 'design'
  }
];

const mockMessages = [
  {
    id: '1',
    from: 'Emily Rodriguez',
    role: 'Project Manager',
    message: 'Hi John! The homepage design is ready for your review. Please let us know your thoughts.',
    timestamp: new Date('2024-02-20T14:30:00'),
    avatar: 'ER'
  },
  {
    id: '2',
    from: 'Sarah Chen',
    role: 'Lead Designer',
    message: 'I\'ve uploaded the latest logo variations. Looking forward to your feedback!',
    timestamp: new Date('2024-02-18T11:15:00'),
    avatar: 'SC'
  }
];

export const ClientPortalDashboard = ({ client }) => {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'files' | 'messages'>('overview');
  const [newMessage, setNewMessage] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_progress':
        return 'bg-status-info-background text-status-info-text';
      case 'client_review':
        return 'bg-status-client-review-background text-status-client-review-text';
      case 'completed':
        return 'bg-status-success-background text-status-success-text';
      case 'on_hold':
        return 'bg-status-warning-background text-status-warning-text';
      default:
        return 'bg-neutral-100 text-neutral-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'in_progress':
        return 'In Progress';
      case 'client_review':
        return 'Awaiting Your Review';
      case 'completed':
        return 'Completed';
      case 'on_hold':
        return 'On Hold';
      default:
        return status;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleApprove = (taskId) => {
    alert('Task approved! Thank you for your feedback.');
    // In real app, this would update the task status
  };

  const handleRequestChanges = (taskId) => {
    const feedback = prompt('Please provide feedback for the requested changes:');
    if (feedback) {
      alert('Feedback submitted! Our team will review and make the necessary changes.');
      // In real app, this would update the task status and add feedback
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      alert('Message sent to your project team!');
      setNewMessage('');
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-base">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <FolderIcon className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-text-primary">{mockProjects.length}</p>
              <p className="text-sm text-text-secondary">Total Projects</p>
            </div>
          </div>
        </div>
        
        <div className="card-base">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-status-client-review-background rounded-lg flex items-center justify-center">
              <EyeIcon className="w-6 h-6 text-status-client-review" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-text-primary">
                {mockTasks.filter(t => t.status === 'client_review').length}
              </p>
              <p className="text-sm text-text-secondary">Awaiting Review</p>
            </div>
          </div>
        </div>
        
        <div className="card-base">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-status-success-background rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-status-success" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-text-primary">
                {mockProjects.filter(p => p.status === 'completed').length}
              </p>
              <p className="text-sm text-text-secondary">Completed</p>
            </div>
          </div>
        </div>
        
        <div className="card-base">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-status-info-background rounded-lg flex items-center justify-center">
              <FileIcon className="w-6 h-6 text-status-info" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-text-primary">{mockFiles.length}</p>
              <p className="text-sm text-text-secondary">Files Shared</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Progress */}
      <div className="card-base">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Project Progress</h3>
        <div className="space-y-4">
          {mockProjects.map((project) => (
            <div key={project.id} className="border border-border-primary rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-text-primary">{project.name}</h4>
                  <p className="text-sm text-text-secondary">{project.description}</p>
                </div>
                <span className={clsx(
                  'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                  getStatusColor(project.status)
                )}>
                  {getStatusText(project.status)}
                </span>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-text-secondary">Progress</span>
                  <span className="font-medium text-text-primary">{project.progress}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${project.progress}%`,
                      backgroundColor: client.portalTheme?.primaryColor || '#f97316'
                    }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-text-secondary">Budget:</span>
                  <div className="font-medium text-text-primary">
                    {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
                  </div>
                </div>
                <div>
                  <span className="text-text-secondary">Hours:</span>
                  <div className="font-medium text-text-primary">
                    {project.hoursTracked}h / {project.estimatedHours}h
                  </div>
                </div>
                <div>
                  <span className="text-text-secondary">Due:</span>
                  <div className="font-medium text-text-primary">
                    {project.dueDate.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Awaiting Your Review */}
      <div className="card-base">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Awaiting Your Review
        </h3>
        {mockTasks.filter(t => t.status === 'client_review').length === 0 ? (
          <div className="text-center py-8">
            <CheckCircleIcon className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-text-primary mb-2">All caught up!</h4>
            <p className="text-text-secondary">
              No items are currently awaiting your review.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockTasks.filter(t => t.status === 'client_review').map((task) => (
              <div key={task.id} className="border border-border-primary rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-text-primary">{task.title}</h4>
                    <p className="text-sm text-text-secondary">{task.project}</p>
                    <p className="text-sm text-text-tertiary mt-1">{task.description}</p>
                    {task.attachments.length > 0 && (
                      <div className="flex items-center mt-2">
                        <FileIcon className="w-4 h-4 text-text-tertiary mr-1" />
                        <span className="text-xs text-text-tertiary">
                          {task.attachments.length} attachment(s)
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-text-secondary">
                    Due: {task.dueDate.toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleApprove(task.id)}
                    className="inline-flex items-center px-3 py-2 bg-status-success text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <ThumbsUpIcon className="w-4 h-4 mr-2" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleRequestChanges(task.id)}
                    className="inline-flex items-center px-3 py-2 bg-status-warning text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    <XCircleIcon className="w-4 h-4 mr-2" />
                    Request Changes
                  </button>
                  <button
                    onClick={() => setSelectedTask(task)}
                    className="btn-ghost"
                  >
                    <EyeIcon className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Your Projects</h3>
        <div className="text-sm text-text-secondary">
          {mockProjects.length} total projects
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockProjects.map((project) => (
          <div key={project.id} className="card-base border border-border-primary">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-semibold text-text-primary">{project.name}</h4>
                <p className="text-sm text-text-secondary mt-1">{project.description}</p>
              </div>
              <span className={clsx(
                'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                getStatusColor(project.status)
              )}>
                {getStatusText(project.status)}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-text-secondary">Progress</span>
                  <span className="font-medium text-text-primary">{project.progress}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${project.progress}%`,
                      backgroundColor: client.portalTheme?.primaryColor || '#f97316'
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-secondary">Budget Used:</span>
                  <div className="font-medium text-text-primary">
                    {Math.round((project.spent / project.budget) * 100)}%
                  </div>
                </div>
                <div>
                  <span className="text-text-secondary">Due Date:</span>
                  <div className="font-medium text-text-primary">
                    {project.dueDate.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFiles = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Project Files</h3>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="btn-primary"
        >
          <UploadIcon className="w-4 h-4 mr-2" />
          Upload File
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockFiles.map((file) => (
          <div key={file.id} className="border border-border-primary rounded-lg p-4 hover:bg-background-component-subtle transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <FileIcon className="w-8 h-8 text-text-tertiary mt-1" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-text-primary truncate">{file.name}</h4>
                  <p className="text-sm text-text-secondary">{file.project}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-text-tertiary">{file.size}</span>
                    <span className="text-xs text-text-tertiary">•</span>
                    <span className="text-xs text-text-tertiary">
                      {file.uploadedAt.toLocaleDateString()}
                    </span>
                  </div>
                  <span className={clsx(
                    'inline-flex px-2 py-1 text-xs font-medium rounded-full mt-2',
                    file.type === 'design' ? 'bg-purple-100 text-purple-800' :
                    file.type === 'document' ? 'bg-blue-100 text-blue-800' :
                    file.type === 'report' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  )}>
                    {file.type}
                  </span>
                </div>
              </div>
              <button className="text-primary-600 hover:text-primary-800 p-1">
                <DownloadIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Messages</h3>
        <div className="text-sm text-text-secondary">
          {mockMessages.length} conversations
        </div>
      </div>

      {/* Send Message */}
      <div className="card-base border border-border-primary">
        <h4 className="font-medium text-text-primary mb-3">Send Message to Team</h4>
        <div className="space-y-3">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            rows={3}
            className="w-full px-3 py-2 border border-border-interactive rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SendIcon className="w-4 h-4 mr-2" />
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Message History */}
      <div className="card-base">
        <h4 className="font-medium text-text-primary mb-4">Recent Messages</h4>
        <div className="space-y-4">
          {mockMessages.map((message) => (
            <div key={message.id} className="flex space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">{message.avatar}</span>
              </div>
              <div className="flex-1">
                <div className="bg-background-component-subtle rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-text-primary">{message.from}</span>
                    <span className="text-xs text-text-tertiary">
                      {message.timestamp.toLocaleDateString()} {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">{message.role}</p>
                  <p className="text-sm text-text-primary mt-2">{message.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background-app">
      {/* Header */}
      <header className="bg-background-component border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: client.portalTheme?.primaryColor || '#f97316' }}
              >
                <span className="text-white font-bold text-sm">
                  {client.company.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-text-primary">
                  {client.company} Portal
                </h1>
                <p className="text-sm text-text-secondary">
                  Welcome back, {client.name.split(' ')[0]}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">{client.name}</p>
                <p className="text-xs text-text-secondary">{client.email}</p>
              </div>
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {client.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-background-component border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3Icon },
              { id: 'projects', label: 'Projects', icon: FolderIcon },
              { id: 'files', label: 'Files', icon: FileIcon },
              { id: 'messages', label: 'Messages', icon: MessageSquareIcon },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-interactive'
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'projects' && renderProjects()}
        {activeTab === 'files' && renderFiles()}
        {activeTab === 'messages' && renderMessages()}
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Upload File</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircleIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Files</h4>
                <p className="text-gray-600 mb-4">
                  Drag and drop files here, or click to browse
                </p>
                <button className="btn-primary">
                  Choose Files
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{selectedTask.title}</h3>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircleIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Project</h4>
                  <p className="text-gray-600">{selectedTask.project}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedTask.description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Due Date</h4>
                  <p className="text-gray-600">{selectedTask.dueDate.toLocaleDateString()}</p>
                </div>
                {selectedTask.attachments.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Attachments</h4>
                    <div className="space-y-2">
                      {selectedTask.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded">
                          <span className="text-sm text-gray-900">{attachment}</span>
                          <button className="text-blue-600 hover:text-blue-800">
                            <DownloadIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => handleRequestChanges(selectedTask.id)}
                className="btn-secondary"
              >
                Request Changes
              </button>
              <button
                onClick={() => handleApprove(selectedTask.id)}
                className="btn-primary"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};