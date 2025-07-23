import React, { useState } from 'react';
import {
  HomeIcon,
  BriefcaseIcon,
  CheckSquareIcon,
  ClockIcon,
  BarChartIcon as ChartBarIcon,
  UsersIcon,
  CogIcon,
  FolderIcon,
  PlusIcon,
  SettingsIcon,
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { SpaceManagementModal } from '../Spaces/SpaceManagementModal';
import clsx from 'clsx';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, view: 'dashboard' },
  { name: 'Projects', icon: BriefcaseIcon, view: 'projects' },
  { name: 'Tasks', icon: CheckSquareIcon, view: 'tasks' },
  { name: 'Time Tracking', icon: ClockIcon, view: 'time' },
  { name: 'Reports', icon: ChartBarIcon, view: 'reports' },
  { name: 'Clients', icon: UsersIcon, view: 'clients' },
];

export const Sidebar = () => {
  const { currentView, setCurrentView, spaces, activeSpace, setActiveSpace } = useApp();
  const { user } = useAuth();
  const [showSpaceManagement, setShowSpaceManagement] = useState(false);

  return (
    <>
      <div className="flex flex-col w-64 bg-neutral-900 text-white">
        {/* Logo */}
        <div className="flex items-center h-16 px-6 border-b border-neutral-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="ml-3 text-xl font-semibold">Bolt</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;

            return (
              <button
                key={item.name}
                onClick={() => setCurrentView(item.view)}
                className={clsx(
                  'w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Spaces */}
        <div className="px-4 py-4 border-t border-neutral-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Spaces
            </h3>
            <button
              onClick={() => setShowSpaceManagement(true)}
              className={clsx(
                'p-1 rounded transition-colors',
                showSpaceManagement
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
              )}
              title="Manage spaces"
            >
              <SettingsIcon className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-1">
            {spaces.map((space) => (
              <button
                key={space.id}
                onClick={() => setActiveSpace(activeSpace?.id === space.id ? null : space)}
                className={clsx(
                  'w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors',
                  activeSpace?.id === space.id
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
              >
                <div
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: space.color }}
                />
                <FolderIcon className="w-4 h-4 mr-2" />
                <span className="truncate">{space.name}</span>
              </button>
            ))}
            {spaces.length === 0 && (
              <button
                onClick={() => setShowSpaceManagement(true)}
                className="w-full flex items-center px-3 py-2 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white rounded-lg transition-colors"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                <span>Create Space</span>
              </button>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="px-4 py-4 border-t border-neutral-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-neutral-400 capitalize">
                {user?.role?.replace('_', ' ') || 'Role'}
              </p>
            </div>
            <div
              className={clsx(
                'w-3 h-3 rounded-full',
                user?.isOnline ? 'bg-status-success' : 'bg-neutral-400'
              )}
            />
          </div>
        </div>
      </div>

      {/* Space Management Modal */}
      {showSpaceManagement && (
        <SpaceManagementModal onClose={() => setShowSpaceManagement(false)} />
      )}
    </>
  );
};
