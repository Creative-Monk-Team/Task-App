import React, { useState } from 'react';
import { XIcon, CalendarIcon, DollarSignIcon, UsersIcon, FolderIcon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
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
    autoCreateTasks: false
  });

  const [newTag, setNewTag] = useState('');

  const projectTypes = [
    { value: 'project', label: 'Client Project', description: 'Standard client work with deliverables' },
    { value: 'retainer', label: 'Retainer', description: 'Ongoing monthly retainer work' },
    { value: 'internal', label: 'Internal Project', description: 'Internal company initiatives' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority', color: 'text-green-600' },
    { value: 'medium', label: 'Medium Priority', color: 'text-yellow-600' },
    { value: 'high', label: 'High Priority', color: 'text-orange-600' },
    { value: 'critical', label: 'Critical', color: 'text-red-600' }
  ];

  const teamMembers = [
    { id: '1', name: 'Sarah Chen', role: 'Senior Designer', avatar: 'SC' },
    { id: '2', name: 'Mike Johnson', role: 'SEO Specialist', avatar: 'MJ' },
    { id: '3', name: 'Emily Rodriguez', role: 'Project Manager', avatar: 'ER' },
    { id: '4', name: 'David Kim', role: 'Developer', avatar: 'DK' },
    { id: '5', name: 'Lisa Park', role: 'Content Writer', avatar: 'LP' }
  ];

  const projectTemplates = [
    { id: '1', name: 'Website Redesign', tasks: 12, estimatedHours: 120 },
    { id: '2', name: 'SEO Campaign', tasks: 8, estimatedHours: 80 },
    { id: '3', name: 'Brand Identity', tasks: 15, estimatedHours: 100 },
    { id: '4', name: 'Content Marketing', tasks: 10, estimatedHours: 60 }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

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
          description: `Folder for ${formData.name} project`
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
        due_date: formData.dueDate || null
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
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const toggleTeamMember = (memberId) => {
    setFormData(prev => ({
      ...prev,
      assignedUsers: prev.assignedUsers.includes(memberId)
        ? prev.assignedUsers.filter(id => id !== memberId)
        : [...prev.assignedUsers, memberId]
    }));
  };

  const getAvailableFolders = () => {
    return folders.filter(folder => folder.space_id === formData.spaceId);
  };

  const renderStep1 = () => {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Step 1: Project Info</h2>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded mb-3"
          placeholder="Project Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <textarea
          className="w-full border px-3 py-2 rounded"
          rows="4"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        ></textarea>
      </div>
    );
  };

  const renderStep2 = () => {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Step 2: Organization</h2>
        <select
          className="w-full border px-3 py-2 rounded mb-3"
          value={formData.spaceId}
          onChange={(e) => setFormData({ ...formData, spaceId: e.target.value })}
        >
          <option value="">Select Space</option>
          {spaces.map((space) => (
            <option key={space.id} value={space.id}>{space.name}</option>
          ))}
        </select>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Step 3: Team</h2>
        <div className="grid grid-cols-2 gap-4">
          {teamMembers.map((member) => (
            <label key={member.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.assignedUsers.includes(member.id)}
                onChange={() => toggleTeamMember(member.id)}
              />
              <span>{member.name}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Create New Project</h2>
            <div className="flex items-center mt-2">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={clsx(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                    step >= stepNumber
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  )}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={clsx(
                      'w-12 h-1 mx-2',
                      step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                    )} />
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

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </form>

        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {step > 1 ? 'Previous' : 'Cancel'}
          </button>
          <button
            onClick={handleSubmit}
            disabled={(!formData.name.trim() || !formData.spaceId) || (step === 3 && isSubmitting)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {step < 3 ? 'Next' : (isSubmitting ? 'Creating...' : 'Create Project')}
          </button>
        </div>
      </div>
    </div>
  );
};
