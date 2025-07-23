import React, { useState } from 'react';
import { XIcon, CalendarIcon, DollarSignIcon, UsersIcon, FolderIcon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import clsx from 'clsx';

export const CreateProjectModal = ({ onClose, onProjectCreated }) => {
  const { spaces, folders, createFolder, createList } = useApp();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'project',

    spaceId: '',
    folderId: '',
    clientName: '',
    createNewFolder: false,
    newFolderName: '',

    startDate: '',
    dueDate: '',
    budget: '',
    billableRate: '',

    assignedUsers: [],
    projectManager: '',
    isVisibleToClient: true,

    status: 'planning',
    priority: 'medium',
    tags: [],

    useTemplate: false,
    templateId: '',
    enableTimeTracking: true,
    enableBudgetTracking: true,
    enableClientPortal: true,
    autoCreateTasks: false,
  });

  const [newTag, setNewTag] = useState('');

  const projectTypes = [
    { value: 'project', label: 'Client Project', description: 'Standard client work with deliverables' },
    { value: 'retainer', label: 'Retainer', description: 'Ongoing monthly retainer work' },
    { value: 'internal', label: 'Internal Project', description: 'Internal company initiatives' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority', color: 'text-green-600' },
    { value: 'medium', label: 'Medium Priority', color: 'text-yellow-600' },
    { value: 'high', label: 'High Priority', color: 'text-orange-600' },
    { value: 'critical', label: 'Critical', color: 'text-red-600' },
  ];

  const teamMembers = [
    { id: '1', name: 'Sarah Chen', role: 'Senior Designer', avatar: 'SC' },
    { id: '2', name: 'Mike Johnson', role: 'SEO Specialist', avatar: 'MJ' },
    { id: '3', name: 'Emily Rodriguez', role: 'Project Manager', avatar: 'ER' },
    { id: '4', name: 'David Kim', role: 'Developer', avatar: 'DK' },
    { id: '5', name: 'Lisa Park', role: 'Content Writer', avatar: 'LP' },
  ];

  const projectTemplates = [
    { id: '1', name: 'Website Redesign', tasks: 12, estimatedHours: 120 },
    { id: '2', name: 'SEO Campaign', tasks: 8, estimatedHours: 80 },
    { id: '3', name: 'Brand Identity', tasks: 15, estimatedHours: 100 },
    { id: '4', name: 'Content Marketing', tasks: 10, estimatedHours: 60 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      if (step === 1 && !formData.name.trim()) {
        alert('Please enter a project name');
        return;
      }
      if (step === 2 && !formData.spaceId) {
        alert('Please select a space');
        return;
      }
      if (step === 2 && formData.createNewFolder && !formData.newFolderName.trim()) {
        alert('Please enter a folder name');
        return;
      }
      if (step === 2 && !formData.createNewFolder && !formData.folderId) {
        alert('Please select a folder');
        return;
      }
      setStep(step + 1);
      return;
    }

    if (!formData.name.trim() || !formData.spaceId) {
      alert('Please complete all required fields');
      return;
    }

    handleCreateProject();
  };

  const handleCreateProject = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      let targetFolderId = formData.folderId;

      if (formData.createNewFolder && formData.newFolderName.trim()) {
        const newFolder = await createFolder({
          space_id: formData.spaceId,
          name: formData.newFolderName,
          client_name: formData.clientName || null,
          description: `Folder for ${formData.name} project`,
        });
        targetFolderId = newFolder.id;
      }

      await createList({
        folder_id: targetFolderId,
        name: formData.name,
        description: formData.description || null,
        type: formData.type,
        budget: formData.budget ? parseFloat(formData.budget) : null,
        status: formData.status,
        start_date: formData.startDate || null,
        due_date: formData.dueDate || null,
      });

      onProjectCreated();
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const toggleTeamMember = (memberId) => {
    setFormData((prev) => ({
      ...prev,
      assignedUsers: prev.assignedUsers.includes(memberId)
        ? prev.assignedUsers.filter((id) => id !== memberId)
        : [...prev.assignedUsers, memberId],
    }));
  };

  const getAvailableFolders = () => {
    return folders.filter((folder) => folder.space_id === formData.spaceId);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Basics</h3>

        {/* Project Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter project name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Project Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Type *
          </label>
          <div className="grid grid-cols-1 gap-3">
            {projectTypes.map((type) => (
              <label key={type.value} className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="projectType"
                  value={type.value}
                  checked={formData.type === type.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-1"
                />

                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">{type.label}</div>
                  <div className="text-sm text-gray-500">{type.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the project scope and objectives..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization & Timeline</h3>

        {/* Space Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Space *
          </label>
          <select
            value={formData.spaceId}
            onChange={(e) => setFormData(prev => ({ ...prev, spaceId: e.target.value, folderId: '' }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a space...</option>
            {spaces.map((space) => (
              <option key={space.id} value={space.id}>
                {space.name}
              </option>
            ))}
          </select>
        </div>

        {/* Folder Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Client Folder
          </label>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="radio"
                name="folderOption"
                checked={!formData.createNewFolder}
                onChange={() => setFormData(prev => ({ ...prev, createNewFolder: false }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label className="ml-2 text-sm text-gray-700">Use existing folder</label>
            </div>
            {!formData.createNewFolder && (
              <select
                value={formData.folderId}
                onChange={(e) => setFormData(prev => ({ ...prev, folderId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={formData.createNewFolder}
              >
                <option value="">Select a folder...</option>
                {getAvailableFolders().map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name} {folder.client_name && `(${folder.client_name})`}
                  </option>
                ))}
              </select>
            )}

            <div className="flex items-center">
              <input
                type="radio"
                name="folderOption"
                checked={formData.createNewFolder}
                onChange={() => setFormData(prev => ({ ...prev, createNewFolder: true }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label className="ml-2 text-sm text-gray-700">Create new folder</label>
            </div>
            {formData.createNewFolder && (
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={formData.newFolderName}
                  onChange={(e) => setFormData(prev => ({ ...prev, newFolderName: e.target.value }))}
                  placeholder="Folder name..."
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                  placeholder="Client name..."
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Budget & Billing */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Budget ($)
            </label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
              placeholder="0"
              min="0"
              step="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Billable Rate ($/hour)
            </label>
            <input
              type="number"
              value={formData.billableRate}
              onChange={(e) => setFormData(prev => ({ ...prev, billableRate: e.target.value }))}
              placeholder="0"
              min="0"
              step="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team & Settings</h3>

        {/* Team Assignment */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assign Team Members
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {teamMembers.map((member) => (
              <label key={member.id} className="flex items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.assignedUsers.includes(member.id)}
                  onChange={() => toggleTeamMember(member.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                />
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-xs font-medium">
                      {member.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    <div className="text-xs text-gray-500">{member.role}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Project Manager */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Manager
          </label>
          <select
            value={formData.projectManager}
            onChange={(e) => setFormData(prev => ({ ...prev, projectManager: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select project manager...</option>
            {teamMembers.filter(m => formData.assignedUsers.includes(m.id)).map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} - {member.role}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority Level
          </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <XIcon className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              placeholder="Add a tag..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Project Features */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Project Features</h4>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isVisibleToClient}
              onChange={(e) => setFormData(prev => ({ ...prev, isVisibleToClient: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
            />
            <span className="text-sm text-gray-700">Visible in client portal</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.enableTimeTracking}
              onChange={(e) => setFormData(prev => ({ ...prev, enableTimeTracking: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
            />
            <span className="text-sm text-gray-700">Enable time tracking</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.enableBudgetTracking}
              onChange={(e) => setFormData(prev => ({ ...prev, enableBudgetTracking: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
            />
            <span className="text-sm text-gray-700">Enable budget tracking</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.enableClientPortal}
              onChange={(e) => setFormData(prev => ({ ...prev, enableClientPortal: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
            />
            <span className="text-sm text-gray-700">Enable client portal access</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Create New Project</h2>
            <div className="flex items-center mt-2">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={clsx(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                      step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    )}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={clsx('w-12 h-1 mx-2', step > stepNumber ? 'bg-blue-600' : 'bg-gray-200')}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-6">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {step > 1 ? 'Previous' : 'Cancel'}
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              (step === 1 && !formData.name.trim()) ||
              (step === 2 && (
                !formData.spaceId ||
                (formData.createNewFolder && !formData.newFolderName.trim()) ||
                (!formData.createNewFolder && !formData.folderId)
              )) ||
              (step === 3 && isSubmitting)
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {step < 3 ? 'Next' : isSubmitting ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </div>
    </div>
  );
};

