import React from 'react';
import { 
  UsersIcon, 
  MessageSquareIcon, 
  FileIcon, 
  CheckCircleIcon,
  ClockIcon,
  EyeIcon
} from 'lucide-react';
import clsx from 'clsx';

const clientActivities = [
  {
    id: 1,
    client: 'TechCorp Inc.',
    user: 'John Smith',
    action: 'approved',
    target: 'Homepage Design Mockup',
    time: '2 hours ago',
    type: 'approval',
    avatar: 'JS'
  },
  {
    id: 2,
    client: 'StartupXYZ',
    user: 'Sarah Johnson',
    action: 'commented on',
    target: 'SEO Strategy Document',
    time: '4 hours ago',
    type: 'comment',
    avatar: 'SJ'
  },
  {
    id: 3,
    client: 'RetailCo',
    user: 'Mike Davis',
    action: 'viewed',
    target: 'Brand Guidelines Draft',
    time: '6 hours ago',
    type: 'view',
    avatar: 'MD'
  },
  {
    id: 4,
    client: 'TechCorp Inc.',
    user: 'John Smith',
    action: 'requested changes to',
    target: 'Product Page Layout',
    time: '1 day ago',
    type: 'revision',
    avatar: 'JS'
  },
  {
    id: 5,
    client: 'StartupXYZ',
    user: 'Sarah Johnson',
    action: 'uploaded',
    target: 'Company Logo Assets.zip',
    time: '1 day ago',
    type: 'upload',
    avatar: 'SJ'
  },
  {
    id: 6,
    client: 'RetailCo',
    user: 'Mike Davis',
    action: 'logged into portal',
    target: '',
    time: '2 days ago',
    type: 'login',
    avatar: 'MD'
  }
];

const clientStats = [
  { client: 'TechCorp Inc.', lastActive: '2 hours ago', status: 'active', pendingItems: 2 },
  { client: 'StartupXYZ', lastActive: '4 hours ago', status: 'active', pendingItems: 1 },
  { client: 'RetailCo', lastActive: '2 days ago', status: 'inactive', pendingItems: 3 }
];

export const ClientActivity = () => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'approval':
        return <CheckCircleIcon className="w-4 h-4 text-green-600" />;
      case 'comment':
        return <MessageSquareIcon className="w-4 h-4 text-blue-600" />;
      case 'view':
        return <EyeIcon className="w-4 h-4 text-purple-600" />;
      case 'revision':
        return <ClockIcon className="w-4 h-4 text-orange-600" />;
      case 'upload':
        return <FileIcon className="w-4 h-4 text-indigo-600" />;
      case 'login':
        return <UsersIcon className="w-4 h-4 text-gray-600" />;
      default:
        return <UsersIcon className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'approval':
        return 'bg-green-100';
      case 'comment':
        return 'bg-blue-100';
      case 'view':
        return 'bg-purple-100';
      case 'revision':
        return 'bg-orange-100';
      case 'upload':
        return 'bg-indigo-100';
      case 'login':
        return 'bg-gray-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Client Activity</h3>
        <UsersIcon className="w-5 h-5 text-gray-500" />
      </div>

      {/* Client Status Summary */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Client Status</h4>
        <div className="space-y-2">
          {clientStats.map((client, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className={clsx(
                  'w-2 h-2 rounded-full',
                  client.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                )} />
                <span className="text-sm font-medium text-gray-900">{client.client}</span>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-600">{client.lastActive}</div>
                {client.pendingItems > 0 && (
                  <div className="text-xs text-orange-600">
                    {client.pendingItems} pending
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Recent Activity</h4>
        <div className="space-y-3">
          {clientActivities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center',
                getActivityColor(activity.type)
              )}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                  {activity.target && <span className="font-medium">{activity.target}</span>}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">{activity.client}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {clientActivities.filter(a => a.type === 'approval').length}
            </div>
            <div className="text-xs text-gray-600">Approvals</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {clientActivities.filter(a => a.type === 'comment').length}
            </div>
            <div className="text-xs text-gray-600">Comments</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {clientStats.reduce((sum, c) => sum + c.pendingItems, 0)}
            </div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All Client Activity
        </button>
      </div>
    </div>
  );
};
