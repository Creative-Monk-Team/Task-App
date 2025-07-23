import React from 'react';
import { XIcon, CalendarIcon, UserIcon, TagIcon } from 'lucide-react';
import { TaskFilter, TaskStatus, TaskPriority } from '../../types/tasks';
import clsx from 'clsx';

interface TaskFiltersProps {
  filters: TaskFilter;
  onFiltersChange: (filters: TaskFilter) => void;
  onClose: () => void;
}

const statusOptions: { value: TaskStatus; label: string; color: string }[] = [
  { value: 'todo', label: 'To Do', color: 'bg-gray-100 text-gray-800' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  { value: 'internal_review', label: 'Internal Review', color: 'bg-orange-100 text-orange-800' },
  { value: 'in_revision', label: 'In Revision', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'client_review', label: 'Client Review', color: 'bg-purple-100 text-purple-800' },
  { value: 'blocked', label: 'Blocked', color: 'bg-red-100 text-red-800' },
  { value: 'approved', label: 'Approved', color: 'bg-green-100 text-green-800' },
  { value: 'complete', label: 'Complete', color: 'bg-green-200 text-green-800' },
];

const priorityOptions: { value: TaskPriority; label: string; color: string }[] = [
  { value: 'p1', label: 'P1 - Critical', color: 'bg-red-100 text-red-800' },
  { value: 'p2', label: 'P2 - High', color: 'bg-orange-100 text-orange-800' },
  { value: 'p3', label: 'P3 - Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'p4', label: 'P4 - Low', color: 'bg-green-100 text-green-800' },
];

// Mock assignees - in real app, this would come from context
const assigneeOptions = [
  { id: '1', name: 'Sarah Chen', avatar: 'SC' },
  { id: '2', name: 'Mike Johnson', avatar: 'MJ' },
  { id: '3', name: 'Emily Rodriguez', avatar: 'ER' },
  { id: '4', name: 'David Kim', avatar: 'DK' },
  { id: '5', name: 'Lisa Park', avatar: 'LP' },
];

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  onFiltersChange,
  onClose
}) => {
  const updateFilter = (key: keyof TaskFilter, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const toggleArrayFilter = (key: keyof TaskFilter, value: any) => {
    const currentArray = (filters[key] as any[]) || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    updateFilter(key, newArray.length > 0 ? newArray : undefined);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key as keyof TaskFilter];
    return Array.isArray(value) ? value.length > 0 : value !== undefined;
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filter Tasks</h3>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Clear all
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Status
          </label>
          <div className="space-y-2">
            {statusOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(filters.status || []).includes(option.value)}
                  onChange={() => toggleArrayFilter('status', option.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className={clsx(
                  'ml-2 px-2 py-1 text-xs font-medium rounded-full',
                  option.color
                )}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Priority
          </label>
          <div className="space-y-2">
            {priorityOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(filters.priority || []).includes(option.value)}
                  onChange={() => toggleArrayFilter('priority', option.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className={clsx(
                  'ml-2 px-2 py-1 text-xs font-medium rounded-full',
                  option.color
                )}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Assignees Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Assignees
          </label>
          <div className="space-y-2">
            {assigneeOptions.map((assignee) => (
              <label key={assignee.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(filters.assignees || []).includes(assignee.id)}
                  onChange={() => toggleArrayFilter('assignees', assignee.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="ml-2 flex items-center">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-xs font-medium">
                      {assignee.avatar}
                    </span>
                  </div>
                  <span className="text-sm text-gray-900">{assignee.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Due Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Due Date
          </label>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">From</label>
              <input
                type="date"
                value={filters.dueDate?.start?.toISOString().split('T')[0] || ''}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : undefined;
                  updateFilter('dueDate', {
                    ...filters.dueDate,
                    start: date
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">To</label>
              <input
                type="date"
                value={filters.dueDate?.end?.toISOString().split('T')[0] || ''}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : undefined;
                  updateFilter('dueDate', {
                    ...filters.dueDate,
                    end: date
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Active Filters:</span>
            <span className="text-sm text-gray-600">
              {Object.values(filters).flat().filter(Boolean).length} applied
            </span>
          </div>
        </div>
      )}
    </div>
  );
};