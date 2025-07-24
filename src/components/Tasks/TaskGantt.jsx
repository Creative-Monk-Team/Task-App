import React, { useState } from 'react';
import { CalendarIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import clsx from 'clsx';

export const TaskGantt = ({ tasks }) => {
  const [timeScale, setTimeScale] = useState('weeks');
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() - 30); // Start 30 days ago
    return today;
  });

  // Filter tasks that have dates
  const tasksWithDates = tasks.filter(task => task.startDate || task.dueDate);

  // Calculate timeline range
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 120); // Show 120 days

  const generateTimelineHeaders = () => {
    const headers = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      if (timeScale === 'days') {
        headers.push({
          date: new Date(current),
          label: current.getDate().toString(),
          isWeekend: current.getDay() === 0 || current.getDay() === 6
        });
        current.setDate(current.getDate() + 1);
      } else if (timeScale === 'weeks') {
        headers.push({
          date: new Date(current),
          label: `Week ${Math.ceil(current.getDate() / 7)}`,
          isWeekend: false
        });
        current.setDate(current.getDate() + 7);
      } else {
        headers.push({
          date: new Date(current),
          label: current.toLocaleDateString('en-US', { month: 'short' }),
          isWeekend: false
        });
        current.setMonth(current.getMonth() + 1);
      }
    }

    return headers;
  };

  const getTaskPosition = (task) => {
    const taskStart = task.startDate || task.dueDate;
    const taskEnd = task.dueDate || task.startDate;
    
    if (!taskStart || !taskEnd) return null;

    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const taskStartDays = Math.ceil((taskStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const taskDuration = Math.max(1, Math.ceil((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24)));

    const leftPercent = Math.max(0, (taskStartDays / totalDays) * 100);
    const widthPercent = Math.min(100 - leftPercent, (taskDuration / totalDays) * 100);

    return {
      left: `${leftPercent}%`,
      width: `${widthPercent}%`
    };
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'p1':
        return 'bg-red-500';
      case 'p2':
        return 'bg-orange-500';
      case 'p3':
        return 'bg-yellow-500';
      case 'p4':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete':
        return 'bg-green-600';
      case 'in_progress':
        return 'bg-blue-600';
      case 'blocked':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const timelineHeaders = generateTimelineHeaders();

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Gantt Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900">Gantt Chart</h3>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {tasksWithDates.length} tasks with dates
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Time Scale Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            {['days', 'weeks', 'months'].map((scale) => (
              <button
                key={scale}
                onClick={() => setTimeScale(scale)}
                className={clsx(
                  'px-3 py-1 text-sm font-medium rounded-md transition-colors capitalize',
                  timeScale === scale
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {scale}
              </button>
            ))}
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ZoomOutIcon className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ZoomInIcon className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Gantt Content */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Timeline Header */}
          <div className="flex border-b border-gray-200">
            <div className="w-80 flex-shrink-0 p-4 bg-gray-50 border-r border-gray-200">
              <span className="text-sm font-medium text-gray-900">Task</span>
            </div>
            <div className="flex-1 flex">
              {timelineHeaders.map((header, index) => (
                <div
                  key={index}
                  className={clsx(
                    'flex-1 p-2 text-center text-xs font-medium border-r border-gray-200',
                    header.isWeekend ? 'bg-gray-100 text-gray-500' : 'bg-gray-50 text-gray-700'
                  )}
                  style={{ minWidth: timeScale === 'days' ? '40px' : '80px' }}
                >
                  {header.label}
                </div>
              ))}
            </div>
          </div>

          {/* Task Rows */}
          <div className="divide-y divide-gray-200">
            {tasksWithDates.map((task) => {
              const position = getTaskPosition(task);
              
              return (
                <div key={task.id} className="flex hover:bg-gray-50">
                  {/* Task Info */}
                  <div className="w-80 flex-shrink-0 p-4 border-r border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div 
                        className={clsx('w-3 h-3 rounded-full', getPriorityColor(task.priority))}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {task.title}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {task.list?.name} • {task.folder?.clientName || 'Internal'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex-1 relative h-16 flex items-center">
                    {position && (
                      <div
                        className={clsx(
                          'absolute h-6 rounded-md flex items-center px-2 text-white text-xs font-medium shadow-sm',
                          getStatusColor(task.status)
                        )}
                        style={position}
                        title={`${task.title} (${task.progress}% complete)`}
                      >
                        <div className="truncate">
                          {task.title}
                        </div>
                        
                        {/* Progress Overlay */}
                        <div
                          className="absolute top-0 left-0 h-full bg-white bg-opacity-30 rounded-md"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    )}

                    {/* Today Line */}
                    {(() => {
                      const today = new Date();
                      const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                      const todayDays = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                      const todayPercent = (todayDays / totalDays) * 100;
                      
                      if (todayPercent >= 0 && todayPercent <= 100) {
                        return (
                          <div
                            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                            style={{ left: `${todayPercent}%` }}
                          />
                        );
                      }
                      return null;
                    })()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {tasksWithDates.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks with dates</h3>
          <p className="text-gray-600">
            Add start and due dates to your tasks to see them in the Gantt chart
          </p>
        </div>
      )}
    </div>
  );
};