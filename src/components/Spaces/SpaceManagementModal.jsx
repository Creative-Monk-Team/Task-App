import React, { useState } from 'react';
import {
  XIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  FolderIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { CreateSpaceModal } from './CreateSpaceModal';
import clsx from 'clsx';

export const SpaceManagementModal = ({ onClose }) => {
  const { spaces, updateSpace, deleteSpace } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSpace, setEditingSpace] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    color: '',
    icon: '',
  });

  const handleEditSpace = (space) => {
    setEditingSpace(space);
    setEditForm({
      name: space.name,
      description: space.description || '',
      color: space.color,
      icon: space.icon,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingSpace || !editForm.name.trim()) return;

    try {
      await updateSpace(editingSpace.id, {
        name: editForm.name,
        description: editForm.description || null,
        color: editForm.color,
        icon: editForm.icon,
      });
      setEditingSpace(null);
    } catch (error) {
      console.error('Error updating space:', error);
      alert('Failed to update space. Please try again.');
    }
  };

  const handleDeleteSpace = async (space) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${space.name}"? This will also delete all folders and projects within this space.`
    );
    if (!confirmDelete) return;

    try {
      await deleteSpace(space.id);
    } catch (error) {
      console.error('Error deleting space:', error);
      alert('Failed to delete space. Please try again.');
    }
  };

  const colorOptions = [
    '#3B82F6',
    '#10B981',
    '#8B5CF6',
    '#EC4899',
    '#F59E0B',
    '#EF4444',
    '#6366F1',
    '#14B8A6',
    '#EAB308',
    '#6B7280',
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Manage Spaces</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                New Space
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
            {spaces.length === 0 ? (
              <div className="text-center py-8">
                <FolderIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No spaces yet</h3>
                <p className="text-gray-600 mb-4">
                  Create your first space to organize your projects
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Create Space
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {spaces.map((space) => (
                  <div key={space.id} className="border border-gray-200 rounded-lg p-4">
                    {editingSpace?.id === space.id ? (
                      <div className="space-y-4">
                        <div>
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm((prev) => ({ ...prev, name: e.target.value }))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Space name..."
                          />
                        </div>
                        <div>
                          <textarea
                            value={editForm.description}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows={2}
                            placeholder="Description..."
                          />
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex space-x-1">
                            {colorOptions.map((color) => (
                              <button
                                key={color}
                                type="button"
                                onClick={() =>
                                  setEditForm((prev) => ({ ...prev, color }))
                                }
                                className={clsx(
                                  'w-6 h-6 rounded border-2',
                                  editForm.color === color
                                    ? 'border-gray-400'
                                    : 'border-gray-200'
                                )}
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setEditingSpace(null)}
                            className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveEdit}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: space.color }}
                          >
                            <FolderIcon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{space.name}</h3>
                            {space.description && (
                              <p className="text-sm text-gray-500">{space.description}</p>
                            )}
                            <p className="text-xs text-gray-400">
                              Created {new Date(space.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleEditSpace(space)}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit space"
                          >
                            <EditIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSpace(space)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete space"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Space Modal */}
      {showCreateModal && (
        <CreateSpaceModal
          onClose={() => setShowCreateModal(false)}
          onSpaceCreated={() => setShowCreateModal(false)}
        />
      )}
    </>
  );
};
