import React from 'react';
import { 
  CheckCircleIcon, 
  MessageSquareIcon, 
  FileIcon, 
  UserPlusIcon,
  ClockIcon
} from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'task_completed',
    user: 'Sarah Chen',
    action: 'completed',
    target: 'Homepage Design Mockup',
    time: '2 minutes ago',
    icon: CheckCircleIcon,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100'
  },
  {
    id: 2,
    type: 'comment',
    user: 'Mike Johnson',
    action: 'commented on',
    target: 'SEO Strategy Document',
    time: '15 minutes ago',
    icon: MessageSquareIcon,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100'
  },
  {
    id: 3,
    type: 'file_upload',
    user: 'Emily Rodriguez',
    action: 'uploaded',
    target: 'Brand Guidelines v2.pdf',
    time: '1 hour ago',
    icon: FileIcon,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100'
  },
  {
    id: 4,
    type: 'user_added',
    user: 'David Kim',
    action: 'added',
    target: 'Alex Thompson to TechCorp project',
    time: '2 hours ago',
    icon: UserPlusIcon,
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-100'
  },
  {
    id: 5,
    type: 'time_logged',
    user: 'Lisa Park',
    action: 'logged 3.5 hours on',
    target: 'Content Creation',
    time: '3 hours ago',
    icon: ClockIcon,
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100'
  }
];

export const RecentActivity = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.iconBg}`}>
                <Icon className={`w-4 h-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span>
                  {' '}{activity.action}{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
        View all activity
      </button>
    </div>
  );
};