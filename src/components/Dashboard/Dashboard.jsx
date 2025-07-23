import React from 'react';
import { DashboardWidget } from './DashboardWidget';
import { RecentActivity } from './RecentActivity';
import { TeamCapacity } from './TeamCapacity';
import { ProjectProgress } from './ProjectProgress';

export const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening at your agency.
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardWidget
          title="Active Projects"
          value={12}
          subtitle="3 due this week"
          icon="check"
          trend={{ value: 8.2, isPositive: true }}
        />
        <DashboardWidget
          title="Team Utilization"
          value="87%"
          subtitle="Above target"
          icon="users"
          trend={{ value: 5.1, isPositive: true }}
        />
        <DashboardWidget
          title="Monthly Revenue"
          value="$124,500"
          subtitle="Billable hours tracked"
          icon="dollar"
          trend={{ value: 12.3, isPositive: true }}
        />
        <DashboardWidget
          title="Hours This Week"
          value="342"
          subtitle="8 hours ahead of schedule"
          icon="clock"
          trend={{ value: 3.7, isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Progress */}
        <div className="lg:col-span-2">
          <ProjectProgress />
        </div>

        {/* Team Capacity */}
        <div>
          <TeamCapacity />
        </div>
      </div>

      {/* Recent Activity & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
          <div className="space-y-4">
            {[
              {
                task: 'Website Redesign - Final Review',
                client: 'TechCorp Inc.',
                due: '2 days',
                priority: 'high',
              },
              {
                task: 'SEO Report Generation',
                client: 'StartupXYZ',
                due: '4 days',
                priority: 'medium',
              },
              {
                task: 'Brand Guidelines Delivery',
                client: 'RetailCo',
                due: '1 week',
                priority: 'low',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.task}</p>
                  <p className="text-sm text-gray-600">{item.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{item.due}</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : item.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
