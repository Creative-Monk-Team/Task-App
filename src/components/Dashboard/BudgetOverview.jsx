import React from 'react';
import { DollarSignIcon, TrendingUpIcon, TrendingDownIcon, AlertCircleIcon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';
import clsx from 'clsx';

const budgetData = [
  {
    project: 'Website Redesign',
    client: 'TechCorp Inc.',
    budget: 45000,
    spent: 33750,
    remaining: 11250,
    status: 'on_track'
  },
  {
    project: 'SEO Campaign',
    client: 'StartupXYZ',
    budget: 25000,
    spent: 18500,
    remaining: 6500,
    status: 'on_track'
  },
  {
    project: 'Brand Identity',
    client: 'RetailCo',
    budget: 15000,
    spent: 14200,
    remaining: 800,
    status: 'over_budget'
  },
  {
    project: 'E-commerce Platform',
    client: 'TechCorp Inc.',
    budget: 65000,
    spent: 32500,
    remaining: 32500,
    status: 'under_budget'
  }
];

export const BudgetOverview = () => {
  const { lists } = useApp();
  
  const totalBudget = budgetData.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const utilizationRate = (totalSpent / totalBudget) * 100;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'on_track':
        return 'text-green-600';
      case 'over_budget':
        return 'text-red-600';
      case 'under_budget':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on_track':
        return <TrendingUpIcon className="w-4 h-4 text-green-600" />;
      case 'over_budget':
        return <AlertCircleIcon className="w-4 h-4 text-red-600" />;
      case 'under_budget':
        return <TrendingDownIcon className="w-4 h-4 text-blue-600" />;
      default:
        return <DollarSignIcon className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Budget Overview</h3>
        <DollarSignIcon className="w-5 h-5 text-gray-500" />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{formatCurrency(totalBudget)}</div>
          <div className="text-xs text-gray-600">Total Budget</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{formatCurrency(totalSpent)}</div>
          <div className="text-xs text-gray-600">Spent</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{formatCurrency(totalRemaining)}</div>
          <div className="text-xs text-gray-600">Remaining</div>
        </div>
      </div>

      {/* Overall Utilization */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Utilization</span>
          <span className="text-sm font-medium text-gray-900">{utilizationRate.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={clsx(
              'h-2 rounded-full transition-all duration-300',
              utilizationRate > 90 ? 'bg-red-500' :
              utilizationRate > 75 ? 'bg-yellow-500' :
              'bg-green-500'
            )}
            style={{ width: `${Math.min(utilizationRate, 100)}%` }}
          />
        </div>
      </div>

      {/* Project Breakdown */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-900">Project Budgets</h4>
        {budgetData.slice(0, 4).map((project, index) => {
          const utilization = (project.spent / project.budget) * 100;
          
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {project.project}
                  </span>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(project.status)}
                    <span className="text-xs text-gray-500">
                      {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={clsx(
                      'h-1.5 rounded-full transition-all duration-300',
                      utilization > 95 ? 'bg-red-500' :
                      utilization > 80 ? 'bg-yellow-500' :
                      'bg-green-500'
                    )}
                    style={{ width: `${Math.min(utilization, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">{project.client}</span>
                  <span className={clsx(
                    'text-xs font-medium',
                    getStatusColor(project.status)
                  )}>
                    {utilization.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alerts */}
      {budgetData.some(p => p.status === 'over_budget') && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircleIcon className="w-4 h-4 text-red-600 mr-2" />
            <span className="text-sm text-red-800">
              {budgetData.filter(p => p.status === 'over_budget').length} project(s) over budget
            </span>
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium">
          View Detailed Budget Report
        </button>
      </div>
    </div>
  );
};