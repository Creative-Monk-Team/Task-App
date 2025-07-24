import React from 'react';
import clsx from 'clsx';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Senior Designer',
    avatar: 'SC',
    capacity: 85,
    hoursThisWeek: 34,
    maxHours: 40,
    status: 'online'
  },
  {
    id: 2,
    name: 'Mike Johnson',
    role: 'SEO Specialist',
    avatar: 'MJ',
    capacity: 92,
    hoursThisWeek: 37,
    maxHours: 40,
    status: 'online'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Project Manager',
    avatar: 'ER',
    capacity: 78,
    hoursThisWeek: 31,
    maxHours: 40,
    status: 'away'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Developer',
    avatar: 'DK',
    capacity: 105,
    hoursThisWeek: 42,
    maxHours: 40,
    status: 'busy'
  },
  {
    id: 5,
    name: 'Lisa Park',
    role: 'Content Writer',
    avatar: 'LP',
    capacity: 67,
    hoursThisWeek: 27,
    maxHours: 40,
    status: 'online'
  }
];

export const TeamCapacity = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Team Capacity</h3>
        <span className="text-sm text-gray-500">This Week</span>
      </div>
      
      <div className="space-y-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center space-x-3">
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">{member.avatar}</span>
              </div>
              <div className={clsx(
                'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white',
                {
                  'bg-green-400': member.status === 'online',
                  'bg-yellow-400': member.status === 'away',
                  'bg-red-400': member.status === 'busy',
                  'bg-gray-400': member.status === 'offline'
                }
              )} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {member.hoursThisWeek}h / {member.maxHours}h
                  </p>
                  <p className={clsx(
                    'text-xs font-medium',
                    member.capacity > 100 ? 'text-red-600' :
                    member.capacity > 85 ? 'text-yellow-600' :
                    'text-green-600'
                  )}>
                    {member.capacity}%
                  </p>
                </div>
              </div>
              
              {/* Capacity Bar */}
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={clsx(
                      'h-2 rounded-full transition-all duration-300',
                      member.capacity > 100 ? 'bg-red-500' :
                      member.capacity > 85 ? 'bg-yellow-500' :
                      'bg-green-500'
                    )}
                    style={{ width: `${Math.min(member.capacity, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Team Average</span>
          <span className="font-medium text-gray-900">85.4%</span>
        </div>
      </div>
    </div>
  );
};