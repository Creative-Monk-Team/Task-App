import React, { useState, useEffect } from 'react';
import {
  PlayIcon,
  PauseIcon,
  ClockIcon,
  BellIcon,
  SearchIcon,
  LogOutIcon,
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import clsx from 'clsx';

export const Header = () => {
  const { activeTimer, startTimer, stopTimer, isClocked, clockIn, clockOut } = useApp();
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timerDuration, setTimerDuration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (activeTimer) {
        const duration = Math.floor(
          (new Date().getTime() - new Date(activeTimer.startTime).getTime()) / 1000
        );
        setTimerDuration(duration);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTimer]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClockToggle = () => {
    isClocked ? clockOut() : clockIn();
  };

  const handleTimerToggle = () => {
    if (activeTimer) {
      stopTimer();
    } else {
      startTimer('1', 'Working on current task'); // Demo task
    }
  };

  return (
    <header className="bg-background-component border-b border-border-primary px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Search */}
        <div className="flex items-center flex-1 max-w-lg">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects, tasks, or people..."
              className="input-base w-full pl-10 pr-4 py-2"
            />
          </div>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center space-x-4">
          {/* Clock In/Out */}
          <button
            onClick={handleClockToggle}
            className={clsx(
              'flex items-center px-4 py-2 rounded-md font-semibold text-sm transition-colors',
              isClocked
                ? 'bg-status-success-background text-status-success-text hover:bg-status-success-background/80'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            )}
          >
            <ClockIcon className="w-4 h-4 mr-2" />
            {isClocked ? 'Clock Out' : 'Clock In'}
          </button>

          {/* Timer */}
          <div className="flex items-center space-x-2">
            {activeTimer && (
              <div className="text-sm font-mono text-text-secondary">
                {formatTime(timerDuration)}
              </div>
            )}
            <button
              onClick={handleTimerToggle}
              className={clsx(
                'flex items-center px-4 py-2 rounded-md font-semibold text-sm transition-colors',
                activeTimer
                  ? 'bg-status-error-background text-status-error-text hover:bg-status-error-background/80'
                  : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
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

          {/* Notifications */}
          <button className="relative p-2 text-neutral-400 hover:text-neutral-600 transition-colors">
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-status-error rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-text-primary">{user?.name}</p>
              <p className="text-xs text-text-tertiary capitalize">
                {user?.role?.replace('_', ' ')}
              </p>
            </div>
            <div className="relative">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div
                className={clsx(
                  'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white',
                  user?.isOnline ? 'bg-status-success' : 'bg-neutral-400'
                )}
              />
            </div>
            <button
              onClick={logout}
              className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <LogOutIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
