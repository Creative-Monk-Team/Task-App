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
  PlusIcon
} from 'lucide-react';
import { Task } from '../../types/tasks';
import clsx from 'clsx';

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
  onTaskUpdated: (task: Task) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  onClose,
  onTaskUpdated
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'comments' | 'activity'>('overview');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newSubtask, setNewSubtask] = useState('');

  const getPriorityColor = (priority: string) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'client_review':
        return 'bg-purple-100 text-purple-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleTimerToggle = () => {
    setIsTimerRunning(!isTimerRunning);
    // Timer logic would go here
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Add comment logic would go here
      setNewComment('');
    }
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      // Add subtask logic would go here
      setNewSubtask('');
    }
  };

  const completedSubtasks = task.subtasks.filter(st => st.isCompleted).length;
  const completedChecklist = task.checklist.filter(cl => cl.isCompleted).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className={clsx(
                'inline-flex px-2 py-1 text-xs font-medium rounded-full border',
                getPriorityColor(task.priority)
              )}>
                {task.priority.toUpperCase()}
              </span>
              <span className={clsx(
                'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                getStatusColor(task.status)
              )}>
                {task.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
            <button
              onClick={handleTimerToggle}
              className={clsx(
                'inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium transition-colors',
                isTimerRunning
                  ? 'bg-red-100 text-red-800 hover:bg-red-200'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              )}
            >
              {isTimerRunning ? (
                <PauseIcon className="w-4 h-4 mr-1" />
              ) : (
                <PlayIcon className="w-4 h-4 mr-1" />
              )}
              {isTimerRunning ? 'Stop Timer' : 'Start Timer'}
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-80px)]">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Task Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {task.title}
              </h1>

              {/* Task Description */}
              {task.description && (
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {task.description}
                  </p>
                </div>
              )}

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-medium text-gray-900">{task.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'comments', label: `Comments (${task.comments.length})` },
                    { id: 'activity', label: 'Activity' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
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
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Subtasks */}
                  {task.subtasks.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Subtasks ({completedSubtasks}/{task.subtasks.length})
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {task.subtasks.map((subtask) => (
                          <div key={subtask.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <input
                              type="checkbox"
                              checked={subtask.isCompleted}
                              onChange={() => {
                                // Toggle subtask completion
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className={clsx(
                              'flex-1 text-sm',
                              subtask.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
                            )}>
                              {subtask.title}
                            </span>
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
                  )}

                  {/* Checklist */}
                  {task.checklist.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Checklist ({completedChecklist}/{task.checklist.length})
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {task.checklist.map((item) => (
                          <div key={item.id} className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={item.isCompleted}
                              onChange={() => {
                                // Toggle checklist item
                              }}
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
                  )}

                  {/* Attachments */}
                  {task.attachments.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Attachments ({task.attachments.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {task.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                            <PaperclipIcon className="w-5 h-5 text-gray-400" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {attachment.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(attachment.size / 1024 / 1024).toFixed(1)} MB
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'comments' && (
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
                          <input type="checkbox" className="mr-2" />
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
                    {task.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {comment.userId}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">
                                User {comment.userId}
                              </span>
                              <div className="flex items-center space-x-2">
                                {comment.isInternal && (
                                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                    Internal
                                  </span>
                                )}
                                <span className="text-xs text-gray-500">
                                  {comment.createdAt.toLocaleDateString()}
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
              )}

              {activeTab === 'activity' && (
                <div className="text-center py-8">
                  <ClockIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Activity Timeline</h3>
                  <p className="text-gray-600">
                    Task activity and history will be displayed here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-gray-200 bg-gray-50 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Assignees */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Assignees</h3>
                <div className="flex -space-x-1">
                  {task.assignees.map((assignee, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center border-2 border-white"
                      title={`User ${assignee}`}
                    >
                      <span className="text-white text-xs font-medium">
                        {assignee}
                      </span>
                    </div>
                  ))}
                  <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center border-2 border-white hover:bg-gray-300 transition-colors">
                    <PlusIcon className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-4">
                {task.startDate && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Start Date</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {formatDate(task.startDate)}
                    </div>
                  </div>
                )}
                
                {task.dueDate && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Due Date</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {formatDate(task.dueDate)}
                    </div>
                  </div>
                )}
              </div>

              {/* Time Tracking */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Time Tracking</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Estimated:</span>
                    <span className="font-medium">{task.timeEstimate || 0}h</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tracked:</span>
                    <span className="font-medium">{task.timeTracked}h</span>
                  </div>
                  {task.timeEstimate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Remaining:</span>
                      <span className={clsx(
                        'font-medium',
                        task.timeTracked > task.timeEstimate ? 'text-red-600' : 'text-green-600'
                      )}>
                        {Math.max(0, task.timeEstimate - task.timeTracked)}h
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {task.tags && task.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex px-2 py-1 text-xs font-medium bg-gray-200 text-gray-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Created */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Created</h3>
                <p className="text-sm text-gray-600">
                  {formatDate(task.createdAt)} by User {task.createdBy}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};