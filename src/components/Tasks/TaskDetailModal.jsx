import React, { useState } from 'react';
import { 
  XIcon, 
  CalendarIcon, 
  ClockIcon, 
  UserIcon,
  MessageSquareIcon,
  PaperclipIcon,
  PlayIcon,
  PauseIcon,
  CheckSquareIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  TagIcon,
  AlertCircleIcon,
  CheckCircleIcon
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import clsx from 'clsx';

export const TaskDetailModal = ({ task, onClose, onTaskUpdated }) => {
  const { updateTask, startTimer, stopTimer, activeTimer } = useApp();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newSubtask, setNewSubtask] = useState('');
  const [isInternal, setIsInternal] = useState(true);
  
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description || '',
    status: task.status,
    priority: task.priority,
    due_date: task.due_date || '',
    time_estimate: task.time_estimate.toString(),
    progress: task.progress.toString(),
    is_visible_to_client: task.is_visible_to_client,
    tags: task.tags
  });

  const [subtasks, setSubtasks] = useState([
    { id: '1', title: 'Research competitor websites', isCompleted: true, assignee: 'Sarah Chen', dueDate: new Date('2024-02-20') },
    { id: '2', title: 'Create wireframes', isCompleted: true, assignee: 'Sarah Chen', dueDate: new Date('2024-02-22') },
    { id: '3', title: 'Design mockups', isCompleted: false, assignee: 'Sarah Chen', dueDate: new Date('2024-02-25') },
    { id: '4', title: 'Client review and feedback', isCompleted: false, assignee: null, dueDate: new Date('2024-02-28') }
  ]);

  const [checklist, setChecklist] = useState([
    { id: '1', text: 'Gather brand assets', isCompleted: true },
    { id: '2', text: 'Review style guide', isCompleted: true },
    { id: '3', text: 'Create color palette', isCompleted: false },
    { id: '4', text: 'Select typography', isCompleted: false }
  ]);

  const [comments, setComments] = useState([
    {
      id: '1',
      userId: 'sarah-chen',
      userName: 'Sarah Chen',
      content: 'Initial wireframes are complete. Moving to mockup phase.',
      isInternal: true,
      createdAt: new Date('2024-02-20T10:30:00'),
      attachments: []
    },
    {
      id: '2',
      userId: 'emily-rodriguez',
      userName: 'Emily Rodriguez',
      content: 'Great progress! Please ensure the design aligns with the brand guidelines we discussed.',
      isInternal: true,
      createdAt: new Date('2024-02-21T14:15:00'),
      attachments: []
    }
  ]);

  const [attachments, setAttachments] = useState([
    {
      id: '1',
      name: 'Homepage_Wireframe_v1.pdf',
      url: '#',
      size: 2400000,
      type: 'application/pdf',
      uploadedBy: 'Sarah Chen',
      uploadedAt: new Date('2024-02-20T09:00:00')
    },
    {
      id: '2',
      name: 'Brand_Assets.zip',
      url: '#',
      size: 15600000,
      type: 'application/zip',
      uploadedBy: 'Emily Rodriguez',
      uploadedAt: new Date('2024-02-19T16:30:00')
    }
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'p1':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'p2':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'p3':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'p4':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'client_review':
        return 'bg-purple-100 text-purple-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      case 'internal_review':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSave = async () => {
    try {
      const updatedTask = await updateTask(task.id, {
        title: editForm.title,
        description: editForm.description || null,
        status: editForm.status,
        priority: editForm.priority,
        due_date: editForm.due_date || null,
        time_estimate: parseFloat(editForm.time_estimate) || 0,
        progress: parseInt(editForm.progress) || 0,
        is_visible_to_client: editForm.is_visible_to_client,
        tags: editForm.tags
      });
      
      onTaskUpdated(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  const handleTimerToggle = () => {
    if (activeTimer?.taskId === task.id) {
      stopTimer();
    } else {
      startTimer(task.id, `Working on ${task.title}`);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        userId: user?.id || 'current-user',
        userName: user?.name || 'Current User',
        content: newComment,
        isInternal,
        createdAt: new Date(),
        attachments: []
      };
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    }
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      const subtask = {
        id: Date.now().toString(),
        title: newSubtask,
        isCompleted: false,
        assignee: null,
        dueDate: null
      };
      setSubtasks(prev => [...prev, subtask]);
      setNewSubtask('');
    }
  };

  const toggleSubtask = (subtaskId) => {
    setSubtasks(prev => prev.map(st => 
      st.id === subtaskId ? { ...st, isCompleted: !st.isCompleted } : st
    ));
  };

  const toggleChecklistItem = (itemId) => {
    setChecklist(prev => prev.map(item => 
      item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  const addTag = (tag) => {
    if (tag.trim() && !editForm.tags.includes(tag.trim())) {
      setEditForm(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setEditForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const completedSubtasks = subtasks.filter(st => st.isCompleted).length;
  const completedChecklist = checklist.filter(cl => cl.isCompleted).length;
  const isTimerActive = activeTimer?.taskId === task.id;

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Task Description */}
      {(task.description || isEditing) && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
          {isEditing ? (
            <textarea
              value={editForm.description}
              onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Add task description..."
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">
              {task.description || 'No description provided'}
            </p>
          )}
        </div>
      )}

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
          {isEditing && (
            <input
              type="number"
              min="0"
              max="100"
              value={editForm.progress}
              onChange={(e) => setEditForm(prev => ({ ...prev, progress: e.target.value }))}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
            />
          )}
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Completion</span>
          <span className="text-sm font-medium text-gray-900">{isEditing ? editForm.progress : task.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${isEditing ? editForm.progress : task.progress}%` }}
          />
        </div>
      </div>

      {/* Subtasks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Subtasks ({completedSubtasks}/{subtasks.length})
          </h3>
        </div>
        <div className="space-y-2">
          {subtasks.map((subtask) => (
            <div key={subtask.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                checked={subtask.isCompleted}
                onChange={() => toggleSubtask(subtask.id)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className={clsx(
                'flex-1 text-sm',
                subtask.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
              )}>
                {subtask.title}
              </span>
              {subtask.assignee && (
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                  {subtask.assignee}
                </span>
              )}
              {subtask.dueDate && (
                <span className="text-xs text-gray-500">
                  {formatDate(subtask.dueDate)}
                </span>
              )}
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Add a subtask..."
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAddSubtask}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Checklist ({completedChecklist}/{checklist.length})
          </h3>
        </div>
        <div className="space-y-2">
          {checklist.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => toggleChecklistItem(item.id)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className={clsx(
                'text-sm',
                item.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
              )}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Attachments */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Attachments ({attachments.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <PaperclipIcon className="w-5 h-5 text-gray-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {attachment.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(attachment.size)} • {attachment.uploadedBy}
                </p>
                <p className="text-xs text-gray-400">
                  {formatDate(attachment.uploadedAt)}
                </p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 p-1">
                <PaperclipIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button className="mt-3 w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
          <PlusIcon className="w-4 h-4 mx-auto mb-1" />
          <span className="text-sm">Upload File</span>
        </button>
      </div>
    </div>
  );

  const renderCommentsTab = () => (
    <div className="space-y-4">
      {/* Add Comment */}
      <div className="border border-gray-200 rounded-lg p-4">
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
          className="w-full border-0 resize-none focus:ring-0 focus:outline-none text-sm"
        />
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <label className="flex items-center text-sm text-gray-600">
              <input 
                type="checkbox" 
                checked={isInternal}
                onChange={(e) => setIsInternal(e.target.checked)}
                className="mr-2" 
              />
              Internal comment
            </label>
          </div>
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Comment
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {comment.userName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {comment.userName}
                  </span>
                  <div className="flex items-center space-x-2">
                    {comment.isInternal && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        Internal
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-4">
      <div className="space-y-3">
        {[
          { action: 'Task created', user: 'Emily Rodriguez', time: '3 days ago', icon: PlusIcon, color: 'text-blue-600' },
          { action: 'Status changed to In Progress', user: 'Sarah Chen', time: '2 days ago', icon: EditIcon, color: 'text-green-600' },
          { action: 'File uploaded: Homepage_Wireframe_v1.pdf', user: 'Sarah Chen', time: '1 day ago', icon: PaperclipIcon, color: 'text-purple-600' },
          { action: 'Comment added', user: 'Emily Rodriguez', time: '1 day ago', icon: MessageSquareIcon, color: 'text-orange-600' },
          { action: 'Progress updated to 65%', user: 'Sarah Chen', time: '4 hours ago', icon: CheckCircleIcon, color: 'text-green-600' }
        ].map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100`}>
                <Icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">by {activity.user} • {activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className={clsx(
                'inline-flex px-2 py-1 text-xs font-medium rounded-full border',
                getPriorityColor(isEditing ? editForm.priority : task.priority)
              )}>
                {(isEditing ? editForm.priority : task.priority).toUpperCase()}
              </span>
              <span className={clsx(
                'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                getStatusColor(isEditing ? editForm.status : task.status)
              )}>
                {(isEditing ? editForm.status : task.status).replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
            <button
              onClick={handleTimerToggle}
              className={clsx(
                'inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium transition-colors',
                isTimerActive
                  ? 'bg-red-100 text-red-800 hover:bg-red-200'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              )}
            >
              {isTimerActive ? (
                <PauseIcon className="w-4 h-4 mr-1" />
              ) : (
                <PlayIcon className="w-4 h-4 mr-1" />
              )}
              {isTimerActive ? 'Stop Timer' : 'Start Timer'}
            </button>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                <EditIcon className="w-4 h-4 mr-1 inline" />
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
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Task Title */}
              <div className="mb-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                    className="text-2xl font-bold text-gray-900 w-full border-0 focus:ring-0 focus:outline-none bg-transparent"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">
                    {task.title}
                  </h1>
                )}
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'comments', label: `Comments (${comments.length})` },
                    { id: 'activity', label: 'Activity' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={clsx(
                        'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && renderOverviewTab()}
              {activeTab === 'comments' && renderCommentsTab()}
              {activeTab === 'activity' && renderActivityTab()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-gray-200 bg-gray-50 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Project Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Project</h3>
                <div className="flex items-center space-x-2">
                  {task.space && (
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: task.space.color }}
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{task.list?.name}</p>
                    <p className="text-xs text-gray-500">{task.folder?.client_name || 'Internal'}</p>
                  </div>
                </div>
              </div>

              {/* Status & Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Status</h3>
                  {isEditing ? (
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="internal_review">Internal Review</option>
                      <option value="in_revision">In Revision</option>
                      <option value="client_review">Client Review</option>
                      <option value="blocked">Blocked</option>
                      <option value="approved">Approved</option>
                      <option value="complete">Complete</option>
                    </select>
                  ) : (
                    <span className={clsx(
                      'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                      getStatusColor(task.status)
                    )}>
                      {task.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Priority</h3>
                  {isEditing ? (
                    <select
                      value={editForm.priority}
                      onChange={(e) => setEditForm(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="p1">P1 - Critical</option>
                      <option value="p2">P2 - High</option>
                      <option value="p3">P3 - Medium</option>
                      <option value="p4">P4 - Low</option>
                    </select>
                  ) : (
                    <span className={clsx(
                      'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                      getPriorityColor(task.priority)
                    )}>
                      {task.priority.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-4">
                {(task.start_date || isEditing) && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Start Date</h3>
                    {isEditing ? (
                      <input
                        type="date"
                        value={task.start_date || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, start_date: e.target.value }))}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : task.start_date ? (
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {formatDate(task.start_date)}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Not set</span>
                    )}
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Due Date</h3>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editForm.due_date}
                      onChange={(e) => setEditForm(prev => ({ ...prev, due_date: e.target.value }))}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  ) : task.due_date ? (
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {formatDate(task.due_date)}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">Not set</span>
                  )}
                </div>
              </div>

              {/* Time Tracking */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Time Tracking</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Estimated:</span>
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.5"
                        value={editForm.time_estimate}
                        onChange={(e) => setEditForm(prev => ({ ...prev, time_estimate: e.target.value }))}
                        className="w-16 px-1 py-0.5 border border-gray-300 rounded text-xs text-right"
                      />
                    ) : (
                      <span className="font-medium">{task.time_estimate || 0}h</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tracked:</span>
                    <span className="font-medium">{task.time_tracked}h</span>
                  </div>
                  {task.time_estimate > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Remaining:</span>
                      <span className={clsx(
                        'font-medium',
                        task.time_tracked > task.time_estimate ? 'text-red-600' : 'text-green-600'
                      )}>
                        {Math.max(0, task.time_estimate - task.time_tracked)}h
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(isEditing ? editForm.tags : task.tags).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-200 text-gray-800 rounded-full"
                    >
                      {tag}
                      {isEditing && (
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-gray-600 hover:text-gray-800"
                        >
                          <XIcon className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {isEditing && (
                  <input
                    type="text"
                    placeholder="Add tag..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addTag(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                )}
              </div>

              {/* Client Visibility */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Client Visibility</h3>
                {isEditing ? (
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editForm.is_visible_to_client}
                      onChange={(e) => setEditForm(prev => ({ ...prev, is_visible_to_client: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                    />
                    <span className="text-sm text-gray-700">Visible to client</span>
                  </label>
                ) : (
                  <div className="flex items-center">
                    <div className={clsx(
                      'w-2 h-2 rounded-full mr-2',
                      task.is_visible_to_client ? 'bg-green-500' : 'bg-gray-300'
                    )} />
                    <span className="text-sm text-gray-700">
                      {task.is_visible_to_client ? 'Visible to client' : 'Internal only'}
                    </span>
                  </div>
                )}
              </div>

              {/* Created */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Created</h3>
                <p className="text-sm text-gray-600">
                  {formatDate(task.created_at)} by {task.created_by ? `User ${task.created_by}` : 'System'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};