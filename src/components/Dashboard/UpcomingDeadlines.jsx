import React from 'react';
import { CalendarIcon, AlertCircleIcon, ClockIcon } from 'lucide-react';
import clsx from 'clsx';

const upcomingDeadlines = [
  {
    id: 1,
    task: 'Website Redesign - Final Review',
    client: 'TechCorp Inc.',
    project: 'Website Redesign',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    priority: 'high',
    status: 'in_progress',
    assignee: 'Sarah Chen'
  },
  {
    id: 2,
    task: 'SEO Report Generation',
    client: 'StartupXYZ',
    project: 'Q4 SEO Campaign',
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    priority: 'medium',
    status: 'todo',
    assignee: 'Mike Johnson'
  },
  {
    id: 3,
    task: 'Brand Guidelines Delivery',
    client: 'RetailCo',
    project: 'Brand Identity Package',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    priority: 'low',
    status: 'internal_review',
    assignee: 'Emily Rodriguez'
  },
  {
    id: 4,
    task: 'Client Presentation Prep',
    client: 'TechCorp Inc.',
    project: 'Website Redesign',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    priority: 'high',
    status: 'todo',
    assignee: 'Emily Rodriguez'
  },
  {
    id: 5,
    task: 'Social Media Content Calendar',
    client: 'StartupXYZ',
    project: 'Social Media Management',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    priority: 'medium',
    status: 'in_progress',
    assignee: 'Lisa Park'
  }
];

export const UpcomingDeadlines = () => {
  const formatDueDate = (date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 0 && diffDays <= 7) return `${diffDays} days`;
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (dueDate) => {
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'text-red-600';
    if (diffDays <= 1) return 'text-red-600';
    if (diffDays <= 3) return 'text-orange-600';
    return 'text-gray-600';
  };

  const isOverdue = (dueDate) => dueDate < new Date();

  const sortedDeadlines = upcomingDeadlines.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500">Next 7 days</span>
        </div>
      </div>

      <div className="space-y-4">
        {sortedDeadlines.map((item) => (
          <div
            key={item.id}
            className={clsx(
              'flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-gray-50',
              isOverdue(item.dueDate) ? 'border-red-200 bg-red-50' : 'border-gray-200'
            )}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                {isOverdue(item.dueDate) && (
                  <AlertCircleIcon className="w-4 h-4 text-red-500 flex-shrink-0" />
                )}
                <p className="font-medium text-gray-900 truncate">{item.task}</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>{item.client}</span>
                <span>•</span>
                <span>{item.project}</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className={clsx(
                  'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                  getPriorityColor(item.priority)
                )}>
                  {item.priority}
                </span>
                <span className="text-xs text-gray-500">
                  Assigned to {item.assignee}
                </span>
              </div>
            </div>
            <div className="text-right ml-4">
              <div className={clsx('text-sm font-medium', getUrgencyColor(item.dueDate))}>
                {formatDueDate(item.dueDate)}
              </div>
              <div className="flex items-center justify-end mt-1">
                <ClockIcon className="w-3 h-3 text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">
                  {item.dueDate.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All Deadlines
        </button>
      </div>
    </div>
  );
};