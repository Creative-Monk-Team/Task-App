import React, { useState } from 'react';
import { XIcon, CalendarIcon, UserIcon, TagIcon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import clsx from 'clsx';

export const CreateTaskModal = ({ onClose, onTaskCreated }) => {
  const { lists, folders, spaces, createTask } = useApp();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    listId: '',
    priority: 'p3',
    status: 'todo',
    assignees: [],
    startDate: '',
    dueDate: '',
    timeEstimate: '',
    tags: [],
    isVisibleToClient: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTag, setNewTag] = useState('');

  const priorityOptions = [
    { value: 'p1', label: 'P1 - Critical', color: 'text-red-600' },
    { value: 'p2', label: 'P2 - High', color: 'text-orange-600' },
    { value: 'p3', label: 'P3 - Medium', color: 'text-yellow-600' },
    { value: 'p4', label: 'P4 - Low', color: 'text-green-600' },
  ];

  const statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'internal_review', label: 'Internal Review' },
    { value: 'client_review', label: 'Client Review' },
  ];

  const assigneeOptions = [
    { id: '1', name: 'Sarah Chen', avatar: 'SC' },
    { id: '2', name: 'Mike Johnson', avatar: 'MJ' },
    { id: '3', name: 'Emily Rodriguez', avatar: 'ER' },
    { id: '4', name: 'David Kim', avatar: 'DK' },
    { id: '5', name: 'Lisa Park', avatar: 'LP' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.listId) return;
    handleCreateTask();
  };

  const handleCreateTask = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      await createTask({
        list_id: formData.listId,
        title: formData.title,
        description: formData.description || null,
        status: formData.status,
        priority: formData.priority,
        start_date: formData.startDate || null,
        due_date: formData.dueDate || null,
        time_estimate: formData.timeEstimate ? parseFloat(formData.timeEstimate) : 0,
        is_visible_to_client: formData.isVisibleToClient,
        tags: formData.tags,
        created_by: user.id,
      });

      onTaskCreated();
    } catch (err) {
      console.error('Error creating task:', err);
      alert('Failed to create task. Please try again.');
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

  const toggleAssignee = (id) => {
    setFormData((prev) => ({
      ...prev,
      assignees: prev.assignees.includes(id)
        ? prev.assignees.filter((x) => x !== id)
        : [...prev.assignees, id],
    }));
  };

  const getProjectContext = (listId) => {
    const list = lists.find((l) => l.id === listId);
    const folder = folders.find((f) => f.id === list?.folderId);
    const space = spaces.find((s) => s.id === folder?.spaceId);
    return { list, folder, space };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Task</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Task Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              placeholder="Describe the task..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Project List */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project *</label>
            <select
              value={formData.listId}
              onChange={(e) => setFormData((prev) => ({ ...prev, listId: e.target.value }))}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a project...</option>
              {lists.map((list) => {
                const { folder, space } = getProjectContext(list.id);
                return (
                  <option key={list.id} value={list.id}>
                    {list.name} • {folder?.clientName || 'Internal'} • {space?.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Priority and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData((prev) => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {priorityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dates and Estimate */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              placeholder="Start Date"
            />
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              placeholder="Due Date"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Estimate (hours)
            </label>
            <input
              type="number"
              value={formData.timeEstimate}
              onChange={(e) => setFormData((prev) => ({ ...prev, timeEstimate: e.target.value }))}
              step="0.5"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter estimation"
            />
          </div>

          {/* Assignees */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assignees</label>
            <div className="grid grid-cols-2 gap-2">
              {assigneeOptions.map((assignee) => (
                <label
                  key={assignee.id}
                  className="flex items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.assignees.includes(assignee.id)}
                    onChange={() => toggleAssignee(assignee.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                  />
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-medium">{assignee.avatar}</span>
                    </div>
                    <span className="text-sm text-gray-900">{assignee.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-blue-600"
                  >
                    <XIcon className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Add a tag..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Add
              </button>
            </div>
          </div>

          {/* Visibility */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isVisibleToClient}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, isVisibleToClient: e.target.checked }))
                }
                className="h-4 w-4 text-blue-600 mr-2"
              />
              <span className="text-sm text-gray-700">Visible to client in portal</span>
            </label>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formData.title.trim() || !formData.listId || isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </div>
    </div>
  );
};
