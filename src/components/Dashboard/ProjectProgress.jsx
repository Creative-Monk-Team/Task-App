import React from 'react';
import { 
  CalendarIcon, 
  UsersIcon, 
  DollarSignIcon 
} from 'lucide-react';
import clsx from 'clsx';

const projects = [
  {
    id: 1,
    name: 'TechCorp Website Redesign',
    client: 'TechCorp Inc.',
    progress: 75,
    budget: 45000,
    spent: 33750,
    dueDate: '2025-02-28',
    team: ['SC', 'DK', 'ER'],
    status: 'on_track'
  },
  {
    id: 2,
    name: 'Q4 SEO Campaign',
    client: 'TechCorp Inc.',
    progress: 60,
    budget: 25000,
    spent: 18500,
    dueDate: '2024-12-31',
    team: ['MJ', 'LP'],
    status: 'on_track'
  },
  {
    id: 3,
    name: 'Brand Identity Package',
    client: 'StartupXYZ',
    progress: 40,
    budget: 15000,
    spent: 8200,
    dueDate: '2025-01-15',
    team: ['SC', 'ER'],
    status: 'at_risk'
  },
  {
    id: 4,
    name: 'E-commerce Platform',
    client: 'RetailCo',
    progress: 90,
    budget: 65000,
    spent: 58500,
    dueDate: '2024-12-20',
    team: ['DK', 'MJ', 'ER'],
    status: 'ahead'
  }
];

export const ProjectProgress = () => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ahead':
        return 'bg-green-100 text-green-800';
      case 'on_track':
        return 'bg-blue-100 text-blue-800';
      case 'at_risk':
        return 'bg-yellow-100 text-yellow-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ahead':
        return 'Ahead of Schedule';
      case 'on_track':
        return 'On Track';
      case 'at_risk':
        return 'At Risk';
      case 'delayed':
        return 'Delayed';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Project Progress</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All Projects
        </button>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="border border-gray-200 rounded-lg p-4">
            {/* Project Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{project.name}</h4>
                <p className="text-sm text-gray-600">{project.client}</p>
              </div>
              <span className={clsx(
                'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                getStatusColor(project.status)
              )}>
                {getStatusText(project.status)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <DollarSignIcon className="w-4 h-4 mr-1" />
                <span>{formatCurrency(project.spent)} / {formatCurrency(project.budget)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span>{formatDate(project.dueDate)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <UsersIcon className="w-4 h-4 mr-1" />
                <div className="flex -space-x-1">
                  {project.team.map((member, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center border-2 border-white"
                    >
                      <span className="text-white text-xs font-medium">{member}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};