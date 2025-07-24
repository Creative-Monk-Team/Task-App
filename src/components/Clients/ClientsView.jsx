import React, { useState } from 'react';
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  UsersIcon,
  MailIcon,
  PhoneIcon,
  BuildingIcon,
  EyeIcon,
  TrashIcon,
  SendIcon
} from 'lucide-react';
import { CreateClientModal } from './CreateClientModal';
import clsx from 'clsx';

const mockClients = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@techcorp.com',
    company: 'TechCorp Inc.',
    phone: '+1 (555) 123-4567',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    lastLogin: new Date('2024-01-19'),
    workspaceId: 'workspace-1',
    portalAccess: true,
    accessibleProjects: ['project-1', 'project-2'],
    website: 'https://techcorp.com'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@startupxyz.com',
    company: 'StartupXYZ',
    phone: '+1 (555) 987-6543',
    status: 'active',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-05'),
    lastLogin: new Date('2024-02-04'),
    workspaceId: 'workspace-1',
    portalAccess: true,
    accessibleProjects: ['project-3'],
    website: 'https://startupxyz.com'
  },
  {
    id: '3',
    name: 'Mike Davis',
    email: 'mike@retailco.com',
    company: 'RetailCo',
    status: 'pending',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
    workspaceId: 'workspace-1',
    portalAccess: false,
    accessibleProjects: []
  }
];

export const ClientsView = () => {
  const [clients, setClients] = useState(mockClients);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = !searchQuery ||
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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

  const handleSendInvitation = (client) => {
    console.log('Sending invitation to:', client.email);
    alert(`Invitation sent to ${client.email}`);
  };

  const handleDeleteClient = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(prev => prev.filter(c => c.id !== clientId));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Clients</h1>
          <p className="text-text-secondary mt-1">
            Manage client accounts and portal access
          </p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn-primary">
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-base">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-text-primary">{clients.length}</p>
              <p className="text-sm text-text-secondary">Total Clients</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-base pl-10 pr-4 py-2 w-64"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-base"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button className="btn-ghost">
          <FilterIcon className="w-4 h-4 mr-2" />
          More Filters
        </button>
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <UsersIcon className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No clients found</h3>
          <p className="text-text-secondary mb-4">
            {searchQuery
              ? `No clients match "${searchQuery}"`
              : "Get started by adding your first client"
            }
          </p>
          <button onClick={() => setShowCreateModal(true)} className="btn-primary">
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Client
          </button>
        </div>
      )}

      {showCreateModal && (
        <CreateClientModal
          onClose={() => setShowCreateModal(false)}
          onClientCreated={(newClient) => {
            setClients(prev => [...prev, newClient]);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
};