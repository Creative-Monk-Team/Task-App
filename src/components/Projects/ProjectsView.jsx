import React, { useState } from 'react';
import { 
  PlusIcon, 
  FilterIcon, 
  GridIcon, 
  ListIcon,
  CalendarIcon,
  BarChart3Icon,
  SearchIcon,
  SortAscIcon
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';
import { ProjectCard } from './ProjectCard.jsx';
import { ProjectList } from './ProjectList.jsx';
import { CreateProjectModal } from './CreateProjectModal.jsx';
import { ProjectDetailModal } from './ProjectDetailModal.jsx';
import clsx from 'clsx';

export const ProjectsView = () => {
  const { lists, folders, spaces } = useApp();
  const [viewType, setViewType] = useState('grid');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const viewOptions = [
    { type: 'grid', icon: GridIcon, label: 'Grid' },
    { type: 'list', icon: ListIcon, label: 'List' },
    { type: 'calendar', icon: CalendarIcon, label: 'Calendar' },
    { type: 'gantt', icon: BarChart3Icon, label: 'Gantt' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Projects' },
    { value: 'active', label: 'Active' },
    { value: 'planning', label: 'Planning' },
    { value: 'on_hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' },
  ];

  const filteredProjects = lists
    .filter(project => {
      const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
      const matchesSearch = !searchQuery || 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'dueDate') {
        aValue = aValue ? new Date(aValue).getTime() : Infinity;
        bValue = bValue ? new Date(bValue).getTime() : Infinity;
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const getProjectsWithContext = () => {
    return filteredProjects.map(project => {
      const folder = folders.find(f => f.id === project.folderId);
      const space = spaces.find(s => s.id === folder?.spaceId);
      return {
        ...project,
        folder,
        space
      };
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">
            Manage all your client projects and internal initiatives
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          New Project
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            {viewOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.type}
                  onClick={() => setViewType(option.type)}
                  className={clsx(
                    'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    viewType === option.type
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {option.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter
          </button>
          
          <select
            value={`${sortBy}-${sortDirection}`}
            onChange={(e) => {
              const [field, direction] = e.target.value.split('-');
              setSortBy(field);
              setSortDirection(direction);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="dueDate-asc">Due Date (Earliest)</option>
            <option value="dueDate-desc">Due Date (Latest)</option>
            <option value="budget-desc">Budget (Highest)</option>
            <option value="budget-asc">Budget (Lowest)</option>
            <option value="status-asc">Status</option>
          </select>
        </div>
      </div>

      {/* Project Count */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        <span>
          {filteredProjects.filter(p => p.status === 'active').length} active
        </span>
      </div>

      {/* Projects Display */}
      <div className="min-h-96">
        {viewType === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getProjectsWithContext().map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        )}

        {viewType === 'list' && (
          <ProjectList 
            projects={getProjectsWithContext()} 
            onProjectClick={(project) => setSelectedProject(project)}
          />
        )}

        {(viewType === 'calendar' || viewType === 'gantt') && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {viewType === 'calendar' ? (
                <CalendarIcon className="w-8 h-8 text-gray-400" />
              ) : (
                <BarChart3Icon className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {viewType === 'calendar' ? 'Calendar View' : 'Gantt Chart'}
            </h3>
            <p className="text-gray-600 mb-4">
              {viewType === 'calendar' 
                ? 'View projects and deadlines in a calendar format'
                : 'Visualize project timelines and dependencies'
              }
            </p>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Coming Soon
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GridIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-4">
            {filterStatus === 'all' 
              ? "Get started by creating your first project"
              : searchQuery 
                ? `No projects found matching "${searchQuery}"`
                : `No projects with status "${filterStatus}"`
            }
          </p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create Project
          </button>
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onProjectCreated={() => {
            setShowCreateModal(false);
          }}
        />
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onProjectUpdated={(updatedProject) => {
            setSelectedProject(updatedProject);
          }}
          onProjectDeleted={() => {
            setSelectedProject(null);
          }}
        />
      )}
    </div>
  );
};