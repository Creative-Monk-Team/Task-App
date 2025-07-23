import React, { useState, useMemo } from 'react';
import {
  PlusIcon,
  FilterIcon,
  ColumnsIcon as ViewColumnsIcon,
  CalendarIcon,
  BarChart3Icon,
  SearchIcon,
  SortAscIcon,
} from 'lucide-react';
import { TaskList } from './TaskList';
import { TaskBoard } from './TaskBoard';
import { TaskCalendar } from './TaskCalendar';
import { TaskGantt } from './TaskGantt';
import { TaskFilters } from './TaskFilters';
import { CreateTaskModal } from './CreateTaskModal';
import { useApp } from '../../contexts/AppContext';
import clsx from 'clsx';

export const TasksView = () => {
  const { tasks, lists, folders, spaces, tasksLoading } = useApp();

  const [currentView, setCurrentView] = useState('list');
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({
    field: 'due_date',
    direction: 'asc'
  });

  const viewOptions = [
    { type: 'list', icon: ViewColumnsIcon, label: 'List' },
    { type: 'board', icon: ViewColumnsIcon, label: 'Board' },
    { type: 'calendar', icon: CalendarIcon, label: 'Calendar' },
    { type: 'gantt', icon: BarChart3Icon, label: 'Gantt' },
  ];

  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.status?.length) {
      filtered = filtered.filter(task => filters.status.includes(task.status));
    }

    if (filters.priority?.length) {
      filtered = filtered.filter(task => filters.priority.includes(task.priority));
    }

    if (filters.dueDate?.start) {
      filtered = filtered.filter(task =>
        task.due_date && new Date(task.due_date) >= filters.dueDate.start
      );
    }
    if (filters.dueDate?.end) {
      filtered = filtered.filter(task =>
        task.due_date && new Date(task.due_date) <= filters.dueDate.end
      );
    }

    if (filters.tags?.length) {
      filtered = filtered.filter(task =>
        task.tags.some(tag => filters.tags.includes(tag))
      );
    }

    filtered.sort((a, b) => {
      let aValue = a[sort.field];
      let bValue = b[sort.field];

      if (sort.field === 'due_date') {
        aValue = aValue ? new Date(aValue).getTime() : Infinity;
        bValue = bValue ? new Date(bValue).getTime() : Infinity;
      } else if (sort.field === 'priority') {
        const priorityOrder = { p1: 1, p2: 2, p3: 3, p4: 4 };
        aValue = priorityOrder[aValue];
        bValue = priorityOrder[bValue];
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [tasks, searchQuery, filters, sort]);

  const getTasksWithContext = () => {
    return filteredTasks.map(task => {
      const list = lists.find(l => l.id === task.list_id);
      const folder = folders.find(f => f.id === list?.folder_id);
      const space = spaces.find(s => s.id === folder?.space_id);
      return {
        ...task,
        list,
        folder,
        space
      };
    });
  };

  const renderCurrentView = () => {
    const tasksWithContext = getTasksWithContext();
    switch (currentView) {
      case 'list':
        return <TaskList tasks={tasksWithContext} />;
      case 'board':
        return <TaskBoard tasks={tasksWithContext} />;
      case 'calendar':
        return <TaskCalendar tasks={tasksWithContext} />;
      case 'gantt':
        return <TaskGantt tasks={tasksWithContext} />;
      default:
        return <TaskList tasks={tasksWithContext} />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all project tasks and deliverables
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          New Task
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* View toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            {viewOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.type}
                  onClick={() => setCurrentView(option.type)}
                  className={clsx(
                    'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    currentView === option.type
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {option.label}
                </button>
              );
            })}
          </div>

          {/* Search input */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={clsx(
              'inline-flex items-center px-3 py-2 border rounded-lg text-sm font-medium transition-colors',
              showFilters
                ? 'border-blue-300 bg-blue-50 text-blue-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            )}
          >
            <FilterIcon className="w-4 h-4 mr-2" />
            Filters
          </button>

          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <SortAscIcon className="w-4 h-4 mr-2" />
            Sort
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <TaskFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* Task Count */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        <span>{filteredTasks.filter(t => t.status === 'complete').length} completed</span>
      </div>

      {/* Tasks Display */}
      <div className="min-h-96">
        {tasksLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading tasks...</span>
          </div>
        ) : (
          renderCurrentView()
        )}
      </div>

      {/* Empty State */}
      {!tasksLoading && filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ViewColumnsIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || Object.keys(filters).length > 0
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first task'}
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create Task
          </button>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <CreateTaskModal
          onClose={() => setShowCreateModal(false)}
          onTaskCreated={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};
