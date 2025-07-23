import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from 'lucide-react';
import { Task } from '../../types/tasks';
import { TaskDetailModal } from './TaskDetailModal';
import clsx from 'clsx';

interface TaskCalendarProps {
  tasks: (Task & {
    list?: any;
    folder?: any;
    space?: any;
  })[];
}

export const TaskCalendar: React.FC<TaskCalendarProps> = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Generate calendar days
  const calendarDays = [];
  
  // Previous month days
  const prevMonth = new Date(currentYear, currentMonth - 1, 0);
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    calendarDays.push({
      date: new Date(currentYear, currentMonth - 1, prevMonth.getDate() - i),
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      date: new Date(currentYear, currentMonth, day),
      isCurrentMonth: true,
    });
  }

  // Next month days to fill the grid
  const remainingDays = 42 - calendarDays.length; // 6 weeks * 7 days
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      date: new Date(currentYear, currentMonth + 1, day),
      isCurrentMonth: false,
    });
  }

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getPriorityColor = (priority: string) => {
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
        return 'bg-gray-500';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Today
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CalendarIcon className="w-4 h-4" />
            <span>{tasks.filter(t => t.dueDate).length} tasks with due dates</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {/* Day Headers */}
          {dayNames.map((day) => (
            <div
              key={day}
              className="p-4 text-center text-sm font-medium text-gray-500 bg-gray-50 border-b border-gray-200"
            >
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {calendarDays.map((day, index) => {
            const dayTasks = getTasksForDate(day.date);
            const isCurrentDay = isToday(day.date);

            return (
              <div
                key={index}
                className={clsx(
                  'min-h-32 p-2 border-b border-r border-gray-200 relative',
                  !day.isCurrentMonth && 'bg-gray-50',
                  isCurrentDay && 'bg-blue-50'
                )}
              >
                {/* Date Number */}
                <div className="flex items-center justify-between mb-2">
                  <span className={clsx(
                    'text-sm font-medium',
                    !day.isCurrentMonth ? 'text-gray-400' :
                    isCurrentDay ? 'text-blue-600' : 'text-gray-900'
                  )}>
                    {day.date.getDate()}
                  </span>
                  {dayTasks.length > 3 && (
                    <span className="text-xs text-gray-500 bg-gray-200 px-1 rounded">
                      +{dayTasks.length - 3}
                    </span>
                  )}
                </div>

                {/* Tasks */}
                <div className="space-y-1">
                  {dayTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="cursor-pointer group"
                    >
                      <div className={clsx(
                        'text-xs p-1 rounded truncate border-l-2 bg-white shadow-sm hover:shadow-md transition-shadow',
                        getPriorityColor(task.priority).replace('bg-', 'border-l-')
                      )}>
                        <div className="font-medium text-gray-900 truncate">
                          {task.title}
                        </div>
                        {task.list && (
                          <div className="text-gray-500 truncate">
                            {task.list.name}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Today Indicator */}
                {isCurrentDay && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </div>
            );
          })}
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