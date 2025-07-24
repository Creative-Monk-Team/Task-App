import React, { useState, useEffect } from 'react';
import {
  PlayIcon,
  PauseIcon,
  ClockIcon,
  BellIcon,
  SearchIcon,
  LogOutIcon,
  UserIcon,
  SettingsIcon,
  HelpCircleIcon
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import clsx from 'clsx';

export const Header = () => {
  const { activeTimer, startTimer, stopTimer, isClocked, clockIn, clockOut } = useApp();
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timerDuration, setTimerDuration] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'New task assigned: Homepage Design Review', time: '5 min ago', read: false },
    { id: 2, message: 'Client approved: Brand Guidelines', time: '1 hour ago', read: false },
    { id: 3, message: 'Budget alert: Website Redesign at 85%', time: '2 hours ago', read: true }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (activeTimer) {
        const duration = Math.floor((new Date().getTime() - new Date(activeTimer.startTime).getTime()) / 1000);
        setTimerDuration(duration);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTimer]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClockToggle = () => {
    if (isClocked) clockOut();
    else clockIn();
  };

  const handleTimerToggle = () => {
    if (activeTimer) stopTimer();
    else startTimer('1', 'Working on current task');
  };

  return (
    <header className="bg-background-component border-b border-border-primary px-6 py-4">
      <div className="flex items-center justify-between">
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

        <div className="flex items-center space-x-4">
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
              {activeTimer ? <PauseIcon className="w-4 h-4 mr-2" /> : <PlayIcon className="w-4 h-4 mr-2" />}
              {activeTimer ? 'Stop Timer' : 'Start Timer'}
            </button>
          </div>

          <div className="relative">
            <button className="relative p-2 text-neutral-400 hover:text-neutral-600 transition-colors">
              <BellIcon className="w-6 h-6" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-status-error rounded-full"></span>
              )}
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">{user?.name || 'User'}</p>
                <p className="text-xs text-text-tertiary capitalize">Administrator</p>
              </div>
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <UserIcon className="w-4 h-4 mr-3" />
                  Profile Settings
                </button>
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <SettingsIcon className="w-4 h-4 mr-3" />
                  Preferences
                </button>
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <HelpCircleIcon className="w-4 h-4 mr-3" />
                  Help & Support
                </button>
                <div className="border-t border-gray-200 mt-1">
                  <button
                    onClick={logout}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOutIcon className="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};
