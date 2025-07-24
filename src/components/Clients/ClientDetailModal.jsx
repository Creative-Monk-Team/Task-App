import React, { useState } from 'react';
import { 
  XIcon, 
  EditIcon, 
  TrashIcon, 
  SendIcon,
  EyeIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  BuildingIcon,
  GlobeIcon,
  CalendarIcon,
  FolderIcon,
  SettingsIcon
} from 'lucide-react';
import { Client } from '../../types/client';
import clsx from 'clsx';


export const ClientDetailModal = ({
  client,
  onClose,
  onClientUpdated,
  onClientDeleted
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'portal' | 'settings'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: client.name,
    email: client.email,
    company: client.company,
    phone: client.phone || '',
    website: client.website || '',
    address: client.address || '',
    notes: client.notes || '',
    portalAccess: client.portalAccess,
    primaryColor: client.portalTheme?.primaryColor || '#f97316'
  });

  const handleSave = () => {
    const updatedClient = {
      ...client,
      name: editForm.name,
      email: editForm.email,
      company: editForm.company,
      phone: editForm.phone || undefined,
      website: editForm.website || undefined,
      address: editForm.address || undefined,
      notes: editForm.notes || undefined,
      portalAccess: editForm.portalAccess,
      portalTheme: {
        primaryColor: editForm.primaryColor
      },
      updatedAt: new Date()
    };
    
    onClientUpdated(updatedClient);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${client.name}? This action cannot be undone.`)) {
      onClientDeleted(client.id);
    }
  };

  const handleSendInvitation = () => {
    // In real app, this would send an email invitation
    alert(`Portal invitation sent to ${client.email}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-status-success-background text-status-success-text';
      case 'inactive':
        return 'bg-neutral-100 text-neutral-600';
      case 'pending':
        return 'bg-status-warning-background text-status-warning-text';
      default:
        return 'bg-neutral-100 text-neutral-600';
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                className="input-base w-full"
              />
            ) : (
              <p className="text-text-primary">{client.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                className="input-base w-full"
              />
            ) : (
              <p className="text-text-primary">{client.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Company</label>
            {isEditing ? (
              <input
                type="text"
                value={editForm.company}
                onChange={(e) => setEditForm(prev => ({ ...prev, company: e.target.value }))}
                className="input-base w-full"
              />
            ) : (
              <p className="text-text-primary">{client.company}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={editForm.phone}
                onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                className="input-base w-full"
              />
            ) : (
              <p className="text-text-primary">{client.phone || 'Not provided'}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Website</label>
            {isEditing ? (
              <input
                type="url"
                value={editForm.website}
                onChange={(e) => setEditForm(prev => ({ ...prev, website: e.target.value }))}
                className="input-base w-full"
              />
            ) : (
              <p className="text-text-primary">
                {client.website ? (
                  <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800">
                    {client.website}
                  </a>
                ) : (
                  'Not provided'
                )}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Status</label>
            <span className={clsx(
              'inline-flex px-2 py-1 text-xs font-medium rounded-full',
              getStatusColor(client.status)
            )}>
              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Created</label>
            <p className="text-text-primary">{client.createdAt.toLocaleDateString()}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Last Login</label>
            <p className="text-text-primary">
              {client.lastLogin ? client.lastLogin.toLocaleDateString() : 'Never'}
            </p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">Address</label>
        {isEditing ? (
          <textarea
            value={editForm.address}
            onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
            rows={2}
            className="input-base w-full resize-none"
          />
        ) : (
          <p className="text-text-primary">{client.address || 'Not provided'}</p>
        )}
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">Notes</label>
        {isEditing ? (
          <textarea
            value={editForm.notes}
            onChange={(e) => setEditForm(prev => ({ ...prev, notes: e.target.value }))}
            rows={3}
            className="input-base w-full resize-none"
          />
        ) : (
          <p className="text-text-primary">{client.notes || 'No notes'}</p>
        )}
      </div>
    </div>
  );

  const renderProjectsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Accessible Projects</h3>
        <button className="btn-secondary">
          <FolderIcon className="w-4 h-4 mr-2" />
          Manage Access
        </button>
      </div>
      
      <div className="text-center py-8">
        <FolderIcon className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">No Projects Assigned</h3>
        <p className="text-text-secondary">
          This client doesn't have access to any projects yet.
        </p>
      </div>
    </div>
  );

  const renderPortalTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Portal Settings</h3>
        {client.status === 'pending' && (
          <button 
            onClick={handleSendInvitation}
            className="btn-primary"
          >
            <SendIcon className="w-4 h-4 mr-2" />
            Send Invitation
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
          <div>
            <h4 className="font-medium text-text-primary">Portal Access</h4>
            <p className="text-sm text-text-secondary">Allow client to access their dedicated portal</p>
          </div>
          <div className="flex items-center">
            {isEditing ? (
              <input
                type="checkbox"
                checked={editForm.portalAccess}
                onChange={(e) => setEditForm(prev => ({ ...prev, portalAccess: e.target.checked }))}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-border-interactive rounded"
              />
            ) : (
              <div className={clsx(
                'w-2 h-2 rounded-full',
                client.portalAccess ? 'bg-status-success' : 'bg-neutral-300'
              )} />
            )}
          </div>
        </div>

        {(isEditing ? editForm.portalAccess : client.portalAccess) && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Portal Theme Color
              </label>
              {isEditing ? (
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={editForm.primaryColor}
                    onChange={(e) => setEditForm(prev => ({ ...prev, primaryColor: e.target.value }))}
                    className="w-12 h-10 border border-border-interactive rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editForm.primaryColor}
                    onChange={(e) => setEditForm(prev => ({ ...prev, primaryColor: e.target.value }))}
                    className="input-base flex-1"
                  />
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-lg border border-border-primary"
                    style={{ backgroundColor: client.portalTheme?.primaryColor }}
                  />
                  <span className="text-text-primary">{client.portalTheme?.primaryColor}</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-background-component-subtle rounded-lg">
              <h4 className="font-medium text-text-primary mb-2">Portal URL</h4>
              <p className="text-sm text-text-secondary mb-2">
                Your client can access their portal at:
              </p>
              <code className="text-sm bg-background-component px-2 py-1 rounded border">
                https://portal.youragency.com/client/{client.id}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-text-primary">Client Settings</h3>
      
      <div className="space-y-4">
        <div className="p-4 border border-border-primary rounded-lg">
          <h4 className="font-medium text-text-primary mb-2">Account Status</h4>
          <p className="text-sm text-text-secondary mb-3">
            Change the client's account status
          </p>
          <select className="input-base">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="p-4 border border-status-error-background rounded-lg">
          <h4 className="font-medium text-status-error-text mb-2">Danger Zone</h4>
          <p className="text-sm text-text-secondary mb-3">
            Permanently delete this client and all associated data
          </p>
          <button 
            onClick={handleDelete}
            className="bg-status-error text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <TrashIcon className="w-4 h-4 mr-2 inline" />
            Delete Client
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="modal-base max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {client.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">{client.name}</h2>
              <p className="text-text-secondary">{client.company}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn-ghost"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-secondary"
              >
                <EditIcon className="w-4 h-4 mr-2" />
                Edit
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <XIcon className="w-5 h-5 text-neutral-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-80px)]">
          {/* Sidebar */}
          <div className="w-64 border-r border-border-primary bg-background-component-subtle">
            <nav className="p-4 space-y-1">
              {[
                { id: 'overview', label: 'Overview', icon: UserIcon },
                { id: 'projects', label: 'Projects', icon: FolderIcon },
                { id: 'portal', label: 'Portal', icon: EyeIcon },
                { id: 'settings', label: 'Settings', icon: SettingsIcon },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={clsx(
                      'w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-text-secondary hover:bg-neutral-100 hover:text-text-primary'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'projects' && renderProjectsTab()}
            {activeTab === 'portal' && renderPortalTab()}
            {activeTab === 'settings' && renderSettingsTab()}
          </div>
        </div>
      </div>
    </div>
  );
};