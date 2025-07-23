import React from 'react';
import {
  CalendarIcon,
  UsersIcon,
  DollarSignIcon,
  MoreHorizontalIcon,
  FolderIcon
} from 'lucide-react';
import clsx from 'clsx';

export const ProjectCard = ({ project, onClick }) => {
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const progress = Math.floor(Math.random() * 100);
  const spent = project.budget ? Math.floor(project.budget * (progress / 100)) : 0;

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {project.space && (
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.space.color }}
                />
              )}
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {project.folder?.clientName || 'Internal'}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
            {project.description && (
              <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
            )}
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontalIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Status */}
        <div className="mt-3">
          <span
            className={clsx(
              'inline-flex px-2 py-1 text-xs font-medium rounded-full',
              getStatusColor(project.status)
            )}
          >
            {getStatusText(project.status)}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-900">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            {project.budget && (
              <div className="flex items-center text-gray-600">
                <DollarSignIcon className="w-4 h-4 mr-1" />
                <span>
                  {formatCurrency(spent)} / {formatCurrency(project.budget)}
                </span>
              </div>
            )}
            {project.dueDate && (
              <div className="flex items-center text-gray-600">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span>{formatDate(project.dueDate)}</span>
              </div>
            )}
          </div>
          <div className="flex items-center text-gray-600">
            <UsersIcon className="w-4 h-4 mr-1" />
            <span>{project.assignedUsers?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
