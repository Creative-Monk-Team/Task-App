import React, { useState } from 'react';
import { DashboardWidget } from './DashboardWidget.jsx';
import { RecentActivity } from './RecentActivity.jsx';
import { TeamCapacity } from './TeamCapacity.jsx';
import { ProjectProgress } from './ProjectProgress.jsx';
import { UpcomingDeadlines } from './UpcomingDeadlines.jsx';
import { TimeTrackingSummary } from './TimeTrackingSummary.jsx';
import { BudgetOverview } from './BudgetOverview.jsx';
import { ClientActivity } from './ClientActivity.jsx';
import { useApp } from '../../contexts/AppContext.jsx';
import { 
  CalendarIcon, 
  ClockIcon, 
  DollarSignIcon, 
  UsersIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  BarChart3Icon
} from 'lucide-react';

export const Dashboard = () => {
  const { tasks, lists, spaces, folders, isClocked, activeTimer } = useApp();
  const [dateRange, setDateRange] = useState('7d');

  const totalProjects = lists.length;
  const activeProjects = lists.filter(p => p.status === 'active').length;
  const completedTasks = tasks.filter(t => t.status === 'complete').length;
  const totalTasks = tasks.length;
  const overdueTasks = tasks.filter(t => 
    t.due_date && new Date(t.due_date) < new Date() && t.status !== 'complete'
  ).length;

  const totalHoursTracked = tasks.reduce((sum, task) => sum + task.time_tracked, 0);
  const totalEstimatedHours = tasks.reduce((sum, task) => sum + task.time_estimate, 0);

  const totalBudget = lists.reduce((sum, list) => sum + (list.budget || 0), 0);
  const budgetUtilization = totalBudget > 0 ? (totalBudget * 0.65) / totalBudget * 100 : 0;

  const teamUtilization = 87;
  const monthlyRevenue = totalBudget * 0.65;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at your agency.</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {(activeTimer || !isClocked || overdueTasks > 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            {activeTimer && (
              <div className="flex items-center text-green-700">
                <ClockIcon className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Timer running: {activeTimer.description}</span>
              </div>
            )}
            {!isClocked && (
              <div className="flex items-center text-orange-700">
                <AlertCircleIcon className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">You're not clocked in</span>
              </div>
            )}
            {overdueTasks > 0 && (
              <div className="flex items-center text-red-700">
                <AlertCircleIcon className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">{overdueTasks} overdue tasks</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardWidget
          title="Active Projects"
          value={activeProjects}
          subtitle={`${totalProjects - activeProjects} in other stages`}
          icon="check"
          trend={{ value: 8.2, isPositive: true }}
        />
        <DashboardWidget
          title="Task Completion"
          value={`${totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%`}
          subtitle={`${completedTasks} of ${totalTasks} tasks`}
          icon="check"
          trend={{ value: 5.1, isPositive: true }}
        />
        <DashboardWidget
          title="Team Utilization"
          value={`${teamUtilization}%`}
          subtitle="Above target"
          icon="users"
          trend={{ value: 3.2, isPositive: true }}
        />
        <DashboardWidget
          title="Monthly Revenue"
          value={`$${Math.round(monthlyRevenue).toLocaleString()}`}
          subtitle="Billable hours tracked"
          icon="dollar"
          trend={{ value: 12.3, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardWidget
          title="Hours This Week"
          value={Math.round(totalHoursTracked)}
          subtitle={`${Math.round(totalEstimatedHours)} estimated`}
          icon="clock"
          trend={{ value: 3.7, isPositive: true }}
        />
        <DashboardWidget
          title="Budget Utilization"
          value={`${Math.round(budgetUtilization)}%`}
          subtitle={`$${Math.round(totalBudget * 0.65).toLocaleString()} spent`}
          icon="dollar"
          trend={{ value: 2.1, isPositive: false }}
        />
        <DashboardWidget
          title="Overdue Tasks"
          value={overdueTasks}
          subtitle={overdueTasks > 0 ? "Needs attention" : "All on track"}
          icon="alert"
          trend={{ value: overdueTasks > 0 ? 15.2 : 0, isPositive: false }}
        />
        <DashboardWidget
          title="Client Satisfaction"
          value="4.8/5"
          subtitle="Based on recent feedback"
          icon="trending"
          trend={{ value: 0.3, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProjectProgress />
        </div>
        <div>
          <TeamCapacity />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <UpcomingDeadlines />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TimeTrackingSummary />
        <BudgetOverview />
        <ClientActivity />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CheckCircleIcon className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Create Task</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3Icon className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">New Project</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <UsersIcon className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Client</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUpIcon className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};
