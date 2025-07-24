import React, { useState } from 'react';
import { 
  CalendarIcon, 
  UsersIcon, 
  ClockIcon,
  MessageSquareIcon,
  PaperclipIcon,
  MoreHorizontalIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  PlayIcon
} from 'lucide-react';
import { TaskDetailModal } from './TaskDetailModal';
import clsx from 'clsx';

export const TaskList = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'p1':
        return 'bg-red-100 text-red-800';
      case 'p2':
        return 'bg-orange-100 text-orange-800';
      case 'p3':
        return 'bg-yellow-100 text-yellow-800';
      case 'p4':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  const getStatusText = (status) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatDate = (date) => {
    const now = new Date();
    const taskDate = new Date(date);
    const diffTime = taskDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 0 && diffDays <= 7) return `In ${diffDays} days`;
    if (diffDays < 0 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;

    return taskDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: taskDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr 
                  key={task.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedTask(task)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {task.status === 'complete' ? (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        ) : task.status === 'blocked' ? (
                          <AlertCircleIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {task.title}
                        </div>
                        {task.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {task.description}
                          </div>
                        )}
                        {task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {task.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {task.tags.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{task.tags.length - 2} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {task.space && (
                        <div 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: task.space.color }}
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {task.list?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {task.folder?.client_name || 'Internal'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                      getStatusColor(task.status)
                    )}>
                      {getStatusText(task.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                      getPriorityColor(task.priority)
                    )}>
                      {task.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">No assignees</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.due_date ? (
                      <div className={clsx(
                        'text-sm',
                        isOverdue(task.due_date) && task.status !== 'complete'
                          ? 'text-red-600 font-medium'
                          : 'text-gray-900'
                      )}>
                        {formatDate(task.due_date)}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">No due date</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-900">{task.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      {task.time_tracked > 0 && (
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          <span>{task.time_tracked}h</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Start Timer"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Start timer logic
                        }}
                      >
                        <PlayIcon className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-gray-600 p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          // More actions menu
                        }}
                      >
                        <MoreHorizontalIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onTaskUpdated={(updatedTask) => {
            setSelectedTask(updatedTask);
          }}
        />
      )}
    </>
  );
};