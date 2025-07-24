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
  PauseIcon,
  PlusIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  TrendingUpIcon,
  TrendingDownIcon
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';
import clsx from 'clsx';


export const ProjectDetailModal = ({
  project,
  onClose,
  onProjectUpdated,
  onProjectDeleted
}) => {
  const { updateList, deleteList, tasks, startTimer, stopTimer, activeTimer } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [editForm, setEditForm] = useState({
    name: project.name,
    description: project.description || '',
    status: project.status,
    budget: project.budget?.toString() || '',
    start_date: project.start_date || '',
    due_date: project.due_date || ''
  });

  // Mock data for demonstration
  const projectTasks = tasks.filter(task => task.list_id === project.id);
  const completedTasks = projectTasks.filter(task => task.status === 'complete');
  const inProgressTasks = projectTasks.filter(task => task.status === 'in_progress');
  const blockedTasks = projectTasks.filter(task => task.status === 'blocked');

  const projectStats = {
    progress: projectTasks.length > 0 ? Math.round((completedTasks.length / projectTasks.length) * 100) : 0,
    tasksCompleted: completedTasks.length,
    totalTasks: projectTasks.length,
    hoursTracked: projectTasks.reduce((sum, task) => sum + task.time_tracked, 0),
    estimatedHours: projectTasks.reduce((sum, task) => sum + task.time_estimate, 0),
    budgetSpent: project.budget ? project.budget * 0.65 : 0,
    teamMembers: 4,
    filesUploaded: 23,
    lastActivity: new Date()
  };

  const timeEntries = [
    { id: '1', user: 'Sarah Chen', task: 'Homepage Design', hours: 3.5, date: new Date('2024-02-20'), billable: true },
    { id: '2', user: 'Mike Johnson', task: 'SEO Optimization', hours: 2.0, date: new Date('2024-02-20'), billable: true },
    { id: '3', user: 'Emily Rodriguez', task: 'Project Management', hours: 1.5, date: new Date('2024-02-19'), billable: false },
    { id: '4', user: 'David Kim', task: 'Backend Development', hours: 4.0, date: new Date('2024-02-19'), billable: true }
  ];

  const teamMembers = [
    { id: '1', name: 'Sarah Chen', role: 'Lead Designer', avatar: 'SC', hoursThisWeek: 18, capacity: 85, status: 'online' },
    { id: '2', name: 'Mike Johnson', role: 'SEO Specialist', avatar: 'MJ', hoursThisWeek: 12, capacity: 60, status: 'online' },
    { id: '3', name: 'Emily Rodriguez', role: 'Project Manager', avatar: 'ER', hoursThisWeek: 25, capacity: 95, status: 'away' },
    { id: '4', name: 'David Kim', role: 'Developer', avatar: 'DK', hoursThisWeek: 22, capacity: 88, status: 'busy' }
  ];

  const projectFiles = [
    { id: '1', name: 'Project_Brief.pdf', size: '2.4 MB', uploadedBy: 'Emily Rodriguez', uploadedAt: new Date('2024-02-15'), type: 'document' },
    { id: '2', name: 'Wireframes_v2.fig', size: '15.2 MB', uploadedBy: 'Sarah Chen', uploadedAt: new Date('2024-02-18'), type: 'design' },
    { id: '3', name: 'Brand_Assets.zip', size: '45.8 MB', uploadedBy: 'Sarah Chen', uploadedAt: new Date('2024-02-16'), type: 'assets' },
    { id: '4', name: 'SEO_Strategy.docx', size: '1.2 MB', uploadedBy: 'Mike Johnson', uploadedAt: new Date('2024-02-17'), type: 'document' }
  ];

  const recentActivity = [
    { id: 1, user: 'Sarah Chen', action: 'completed task', target: 'Homepage Design Mockup', time: '2 hours ago', type: 'task_completed' },
    { id: 2, user: 'Mike Johnson', action: 'uploaded file', target: 'SEO_Strategy.docx', time: '4 hours ago', type: 'file_upload' },
    { id: 3, user: 'Emily Rodriguez', action: 'updated project status', target: 'In Progress', time: '1 day ago', type: 'status_change' },
    { id: 4, user: 'David Kim', action: 'logged 4 hours', target: 'Backend Development', time: '1 day ago', type: 'time_logged' },
    { id: 5, user: 'Sarah Chen', action: 'commented on', target: 'Homepage Design Review', time: '2 days ago', type: 'comment' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
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
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleSave = async () => {
    try {
      const updatedProject = await updateList(project.id, {
        name: editForm.name,
        description: editForm.description || null,
        status: editForm.status,
        budget: editForm.budget ? parseFloat(editForm.budget) : null,
        start_date: editForm.start_date || null,
        due_date: editForm.due_date || null
      });
      
      onProjectUpdated(updatedProject);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project. Please try again.');
    }
  };

  const handleTimerToggle = () => {
    if (activeTimer) {
      stopTimer();
    } else {
      startTimer('project-general', `Working on ${project.name}`);
    }
    setIsTimerRunning(!isTimerRunning);
  };

  const handleDeleteProject = async () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        await deleteList(project.id);
        onProjectDeleted();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      }
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Project Description */}
      {(project.description || isEditing) && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Description</h3>
          {isEditing ? (
            <textarea
              value={editForm.description}
              onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Add project description..."
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">
              {project.description || 'No description provided'}
            </p>
          )}
        </div>
      )}

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
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
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
                style={{ width: `${projectStats.estimatedHours > 0 ? (projectStats.hoursTracked / projectStats.estimatedHours) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Task Status Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Status Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{inProgressTasks.length}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{blockedTasks.length}</div>
            <div className="text-sm text-gray-600">Blocked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{projectTasks.length - completedTasks.length - inProgressTasks.length - blockedTasks.length}</div>
            <div className="text-sm text-gray-600">Other</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.slice(0, 5).map((activity) => (
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Project Tasks</h3>
        <button className="btn-primary">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Task
        </button>
      </div>

      {projectTasks.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircleIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h4>
          <p className="text-gray-600 mb-4">
            Create your first task to get started with this project
          </p>
          <button className="btn-primary">
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Task
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {projectTasks.map((task) => (
            <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                  {task.description && (
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  )}
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={clsx(
                      'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                      getStatusColor(task.status)
                    )}>
                      {task.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    <span className="text-xs text-gray-500">
                      Priority: {task.priority.toUpperCase()}
                    </span>
                    {task.due_date && (
                      <span className="text-xs text-gray-500">
                        Due: {formatDate(task.due_date)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{task.progress}%</div>
                  <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                    <div
                      className="bg-blue-600 h-1 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderTimeTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Time Tracking</h3>
        <button
          onClick={handleTimerToggle}
          className={clsx(
            'inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors',
            isTimerRunning
              ? 'bg-red-100 text-red-800 hover:bg-red-200'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
          )}
        >
          {isTimerRunning ? (
            <PauseIcon className="w-4 h-4 mr-2" />
          ) : (
            <PlayIcon className="w-4 h-4 mr-2" />
          )}
          {isTimerRunning ? 'Stop Timer' : 'Start Timer'}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">{projectStats.hoursTracked}h</p>
            <p className="text-sm text-gray-600">Total Tracked</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{projectStats.estimatedHours}h</p>
            <p className="text-sm text-gray-600">Estimated</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {projectStats.estimatedHours > 0 ? Math.round((projectStats.hoursTracked / projectStats.estimatedHours) * 100) : 0}%
            </p>
            <p className="text-sm text-gray-600">Complete</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Recent Time Entries</h4>
        <div className="space-y-3">
          {timeEntries.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {entry.user.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{entry.task}</p>
                  <p className="text-xs text-gray-500">{entry.user} • {formatDate(entry.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{entry.hours}h</p>
                <p className={clsx(
                  'text-xs',
                  entry.billable ? 'text-green-600' : 'text-gray-500'
                )}>
                  {entry.billable ? 'Billable' : 'Non-billable'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBudgetTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Budget Overview</h3>
      
      {project.budget ? (
        <>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(project.budget)}</p>
                <p className="text-sm text-gray-600">Total Budget</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(projectStats.budgetSpent)}</p>
                <p className="text-sm text-gray-600">Spent</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(project.budget - projectStats.budgetSpent)}</p>
                <p className="text-sm text-gray-600">Remaining</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Budget Utilization</span>
                  <span className="font-medium text-gray-900">
                    {Math.round((projectStats.budgetSpent / project.budget) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={clsx(
                      'h-3 rounded-full transition-all duration-300',
                      (projectStats.budgetSpent / project.budget) > 0.9 ? 'bg-red-600' :
                      (projectStats.budgetSpent / project.budget) > 0.75 ? 'bg-yellow-600' :
                      'bg-green-600'
                    )}
                    style={{ width: `${Math.min((projectStats.budgetSpent / project.budget) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">Budget Breakdown</h4>
            <div className="space-y-3">
              {[
                { category: 'Design', spent: project.budget * 0.35, budget: project.budget * 0.4 },
                { category: 'Development', spent: project.budget * 0.25, budget: project.budget * 0.3 },
                { category: 'Project Management', spent: project.budget * 0.05, budget: project.budget * 0.1 },
                { category: 'Testing & QA', spent: 0, budget: project.budget * 0.2 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{item.category}</span>
                      <span className="text-sm text-gray-600">
                        {formatCurrency(item.spent)} / {formatCurrency(item.budget)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(item.spent / item.budget) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">Profitability Analysis</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUpIcon className="w-5 h-5 text-green-600 mr-1" />
                  <span className="text-lg font-bold text-green-900">
                    {formatCurrency(project.budget - projectStats.budgetSpent)}
                  </span>
                </div>
                <p className="text-sm text-green-700">Projected Profit</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3Icon className="w-5 h-5 text-blue-600 mr-1" />
                  <span className="text-lg font-bold text-blue-900">
                    {project.budget ? Math.round(((project.budget - projectStats.budgetSpent) / project.budget) * 100) : 0}%
                  </span>
                </div>
                <p className="text-sm text-blue-700">Profit Margin</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <DollarSignIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No Budget Set</h4>
          <p className="text-gray-600 mb-4">
            Set a project budget to track spending and profitability
          </p>
          <button 
            onClick={() => setIsEditing(true)}
            className="btn-primary"
          >
            Set Budget
          </button>
        </div>
      )}
    </div>
  );

  const renderTeamTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
        <button className="btn-primary">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">{member.avatar}</span>
                </div>
                <div className={clsx(
                  'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white',
                  {
                    'bg-green-400': member.status === 'online',
                    'bg-yellow-400': member.status === 'away',
                    'bg-red-400': member.status === 'busy',
                    'bg-gray-400': member.status === 'offline'
                  }
                )} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">This Week:</span>
                <span className="font-medium text-gray-900">{member.hoursThisWeek}h</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Capacity:</span>
                <span className={clsx(
                  'font-medium',
                  member.capacity > 90 ? 'text-red-600' :
                  member.capacity > 75 ? 'text-yellow-600' :
                  'text-green-600'
                )}>
                  {member.capacity}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={clsx(
                    'h-2 rounded-full transition-all duration-300',
                    member.capacity > 90 ? 'bg-red-500' :
                    member.capacity > 75 ? 'bg-yellow-500' :
                    'bg-green-500'
                  )}
                  style={{ width: `${Math.min(member.capacity, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Team Performance</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(teamMembers.reduce((sum, m) => sum + m.capacity, 0) / teamMembers.length)}%
            </p>
            <p className="text-sm text-gray-600">Avg Capacity</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {teamMembers.reduce((sum, m) => sum + m.hoursThisWeek, 0)}h
            </p>
            <p className="text-sm text-gray-600">Total Hours</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
            <p className="text-sm text-gray-600">Team Size</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFilesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Project Files</h3>
        <button className="btn-primary">
          <PlusIcon className="w-4 h-4 mr-2" />
          Upload File
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectFiles.map((file) => (
          <div key={file.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-3">
              <FileIcon className="w-8 h-8 text-gray-400 mt-1" />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{file.name}</h4>
                <p className="text-sm text-gray-600">{file.size}</p>
                <p className="text-xs text-gray-500">
                  Uploaded by {file.uploadedBy} on {formatDate(file.uploadedAt)}
                </p>
                <span className={clsx(
                  'inline-flex px-2 py-1 text-xs font-medium rounded-full mt-2',
                  file.type === 'design' ? 'bg-purple-100 text-purple-800' :
                  file.type === 'document' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                )}>
                  {file.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
        <FileIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Files</h4>
        <p className="text-gray-600 mb-4">
          Drag and drop files here, or click to browse
        </p>
        <button className="btn-secondary">
          Choose Files
        </button>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Project Settings</h3>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Project Information</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{project.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            {isEditing ? (
              <select
                value={editForm.status}
                onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="on_hold">On Hold</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            ) : (
              <span className={clsx(
                'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                getStatusColor(project.status)
              )}>
                {getStatusText(project.status)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editForm.start_date}
                  onChange={(e) => setEditForm(prev => ({ ...prev, start_date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{project.start_date ? formatDate(project.start_date) : 'Not set'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editForm.due_date}
                  onChange={(e) => setEditForm(prev => ({ ...prev, due_date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{project.due_date ? formatDate(project.due_date) : 'Not set'}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
            {isEditing ? (
              <input
                type="number"
                value={editForm.budget}
                onChange={(e) => setEditForm(prev => ({ ...prev, budget: e.target.value }))}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{project.budget ? formatCurrency(project.budget) : 'Not set'}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-red-200 rounded-lg p-6">
        <h4 className="text-md font-medium text-red-800 mb-4">Danger Zone</h4>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Once you delete a project, there is no going back. Please be certain.
          </p>
          <button
            onClick={handleDeleteProject}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete Project
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
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
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="text-xl font-semibold text-gray-900 border-0 focus:ring-0 focus:outline-none bg-transparent"
                />
              ) : (
                <h2 className="text-xl font-semibold text-gray-900">{project.name}</h2>
              )}
              <div className="flex items-center space-x-2 mt-1">
                <span className={clsx(
                  'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                  getStatusColor(isEditing ? editForm.status : project.status)
                )}>
                  {getStatusText(isEditing ? editForm.status : project.status)}
                </span>
                <span className="text-sm text-gray-500">
                  {project.folder?.client_name || 'Internal'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn-ghost"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-secondary"
              >
                <EditIcon className="w-4 h-4 mr-2" />
                Edit
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-80px)]">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 bg-gray-50">
            <nav className="p-4 space-y-1">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3Icon },
                { id: 'tasks', label: `Tasks (${projectTasks.length})`, icon: CheckCircleIcon },
                { id: 'time', label: 'Time Tracking', icon: ClockIcon },
                { id: 'budget', label: 'Budget', icon: DollarSignIcon },
                { id: 'team', label: 'Team', icon: UsersIcon },
                { id: 'files', label: `Files (${projectFiles.length})`, icon: FileIcon },
                { id: 'settings', label: 'Settings', icon: SettingsIcon },
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

          {/* Main Content */}
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