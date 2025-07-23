import React, { useState } from 'react';
import { XIcon, FolderIcon, PaletteIcon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import clsx from 'clsx';

const colorOptions = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Orange', value: '#F59E0B' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Gray', value: '#6B7280' },
];

const iconOptions = [
  { name: 'Folder', value: 'folder' },
  { name: 'Briefcase', value: 'briefcase' },
  { name: 'Users', value: 'users' },
  { name: 'Star', value: 'star' },
  { name: 'Heart', value: 'heart' },
  { name: 'Zap', value: 'zap' },
  { name: 'Target', value: 'target' },
  { name: 'Rocket', value: 'rocket' },
];

export const CreateSpaceModal = ({ onClose, onSpaceCreated }) => {
  const { createSpace, workspaceId } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
    icon: 'folder',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Please enter a space name');
      return;
    }

    setIsSubmitting(true);
    try {
      try {
        console.log('[CreateSpaceModal] Creating space with:', {
          workspace_id: workspaceId,
          name: formData.name,
          description: formData.description || null,
          color: formData.color,
          icon: formData.icon,
        });

        const result = await createSpace({
          workspace_id: workspaceId,
          name: formData.name,
          description: formData.description || null,
          color: formData.color,
          icon: formData.icon,
        });

        console.log('[CreateSpaceModal] Space creation result:', result);

        onSpaceCreated();
      } catch (error) {
        console.error('[CreateSpaceModal] Error creating space:', error);
        alert('Failed to create space. Please try again.');
      }

    } catch (error) {
      console.error('Error creating space:', error);
      alert('Failed to create space. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="modal-base max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <h2 className="text-xl font-semibold text-text-primary">Create New Space</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <XIcon className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 h-[70vh] overflow-auto">
          {/* Space Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Space Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter space name..."
              className="input-base w-full"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Describe this space..."
              rows={3}
              className="input-base w-full resize-none"
            />
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Color
            </label>
            <div className="grid grid-cols-5 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, color: color.value }))
                  }
                  className={clsx(
                    'w-10 h-10 rounded-lg border-2 transition-all',
                    formData.color === color.value
                      ? 'border-neutral-400 scale-110'
                      : 'border-border-primary hover:border-border-interactive'
                  )}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Icon
            </label>
            <div className="grid grid-cols-4 gap-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon.value}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, icon: icon.value }))
                  }
                  className={clsx(
                    'p-3 border-2 rounded-lg transition-all flex items-center justify-center',
                    formData.icon === icon.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-border-primary hover:border-border-interactive'
                  )}
                  title={icon.name}
                >
                  <FolderIcon className="w-5 h-5 text-neutral-600" />
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="border border-border-primary rounded-lg p-4">
            <h3 className="text-sm font-medium text-text-primary mb-2">Preview</h3>
            <div className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: formData.color }}
              >
                <FolderIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-text-primary">
                  {formData.name || 'Space Name'}
                </div>
                {formData.description && (
                  <div className="text-sm text-text-tertiary">{formData.description}</div>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border-primary">
          <button type="button" onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formData.name.trim() || isSubmitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Space'}
          </button>
        </div>
      </div>
    </div>
  );
};
