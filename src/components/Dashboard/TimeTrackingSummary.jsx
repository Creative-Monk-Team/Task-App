import React from 'react';
import { ClockIcon, PlayIcon, PauseIcon, TrendingUpIcon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';
import clsx from 'clsx';

const weeklyTimeData = [
  { day: 'Mon', hours: 8.5, target: 8 },
  { day: 'Tue', hours: 7.2, target: 8 },
  { day: 'Wed', hours: 9.1, target: 8 },
  { day: 'Thu', hours: 8.8, target: 8 },
  { day: 'Fri', hours: 6.5, target: 8 },
  { day: 'Sat', hours: 0, target: 0 },
  { day: 'Sun', hours: 0, target: 0 }
];

const topProjects = [
  { name: 'Website Redesign', hours: 12.5, percentage: 35 },
  { name: 'SEO Campaign', hours: 8.2, percentage: 23 },
  { name: 'Brand Guidelines', hours: 6.8, percentage: 19 },
  { name: 'Social Media', hours: 4.1, percentage: 12 },
  { name: 'Other', hours: 3.9, percentage: 11 }
];

export const TimeTrackingSummary = () => {
  const { activeTimer, isClocked, startTimer, stopTimer } = useApp();

  const totalHoursThisWeek = weeklyTimeData.reduce((sum, day) => sum + day.hours, 0);
  const targetHoursThisWeek = weeklyTimeData.reduce((sum, day) => sum + day.target, 0);
  const averageHoursPerDay = totalHoursThisWeek / 5;

  const handleQuickTimer = () => {
    if (activeTimer) {
      stopTimer();
    } else {
      startTimer('general', 'General work');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Time Tracking</h3>
        <div className="flex items-center space-x-2">
          <div className={clsx(
            'w-2 h-2 rounded-full',
            isClocked ? 'bg-green-500' : 'bg-gray-400'
          )} />
          <span className="text-sm text-gray-600">
            {isClocked ? 'Clocked In' : 'Clocked Out'}
          </span>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Quick Timer</span>
          {activeTimer && (
            <span className="text-sm text-blue-600 font-mono">
              Running: {activeTimer.description}
            </span>
          )}
        </div>
        <button
          onClick={handleQuickTimer}
          className={clsx(
            'w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors',
            activeTimer
              ? 'bg-red-100 text-red-800 hover:bg-red-200'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
          )}
        >
          {activeTimer ? (
            <PauseIcon className="w-4 h-4 mr-2" />
          ) : (
            <PlayIcon className="w-4 h-4 mr-2" />
          )}
          {activeTimer ? 'Stop Timer' : 'Start Timer'}
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-900">This Week</h4>
          <div className="flex items-center text-sm text-gray-600">
            <TrendingUpIcon className="w-4 h-4 mr-1 text-green-500" />
            <span>{totalHoursThisWeek.toFixed(1)}h / {targetHoursThisWeek}h</span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-3">
          {weeklyTimeData.map((day) => (
            <div key={day.day} className="text-center">
              <div className="text-xs text-gray-500 mb-1">{day.day}</div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={clsx(
                      'h-2 rounded-full transition-all duration-300',
                      day.hours >= day.target ? 'bg-green-500' :
                      day.hours >= day.target * 0.8 ? 'bg-yellow-500' :
                      'bg-red-500'
                    )}
                    style={{ width: `${day.target > 0 ? Math.min((day.hours / day.target) * 100, 100) : 0}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1">{day.hours}h</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">{totalHoursThisWeek.toFixed(1)}h</div>
            <div className="text-xs text-gray-600">Total This Week</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">{averageHoursPerDay.toFixed(1)}h</div>
            <div className="text-xs text-gray-600">Daily Average</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Time by Project</h4>
        <div className="space-y-2">
          {topProjects.map((project, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-900 truncate">{project.name}</span>
                  <span className="text-sm text-gray-600">{project.hours}h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-blue-600 h-1 rounded-full"
                    style={{ width: `${project.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium">
          View Detailed Timesheet
        </button>
      </div>
    </div>
  );
};