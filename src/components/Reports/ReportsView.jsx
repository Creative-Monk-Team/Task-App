import React, { useState, useEffect } from 'react';
import { 
  BarChart3Icon, 
  TrendingUpIcon, 
  DownloadIcon, 
  RefreshCwIcon,
  CalendarIcon,
  FilterIcon,
  PlusIcon,
  SettingsIcon,
  FileTextIcon,
  ShareIcon
} from 'lucide-react';
import { ReportDashboard } from './ReportDashboard.jsx';
import { IntegrationSettings } from './IntegrationSettings.jsx';
import { CreateReportModal } from './CreateReportModal.jsx';
import { useApp } from '../../contexts/AppContext.jsx';
import clsx from 'clsx';

// Mock data for demonstration
const mockIntegrations = [
  {
    platform: 'google_analytics',
    connected: true,
    lastSync: new Date('2024-01-20T10:30:00'),
    error: null,
    accountInfo: {
      accountId: 'GA-123456789',
      accountName: 'TechCorp Website',
      profileId: 'UA-123456789-1',
      profileName: 'All Web Site Data'
    }
  },
  {
    platform: 'search_console',
    connected: true,
    lastSync: new Date('2024-01-20T10:25:00'),
    error: null,
    accountInfo: {
      accountId: 'SC-techcorp.com',
      accountName: 'techcorp.com'
    }
  },
  {
    platform: 'facebook',
    connected: false,
    lastSync: null,
    error: 'Authentication expired',
    accountInfo: undefined
  },
  {
    platform: 'instagram',
    connected: true,
    lastSync: new Date('2024-01-20T09:45:00'),
    error: null,
    accountInfo: {
      accountId: 'IG-techcorp',
      accountName: '@techcorp_official'
    }
  }
];

const mockReports = [
  {
    id: '1',
    clientId: '1',
    clientName: 'TechCorp Inc.',
    reportPeriod: {
      start: new Date('2024-01-01'),
      end: new Date('2024-01-31')
    },
    generatedAt: new Date('2024-02-01T09:00:00'),
    analytics: {},
    summary: {
      totalSessions: 15420,
      totalUsers: 12350,
      totalReach: 45600,
      totalEngagement: 2340,
      conversionRate: 3.2,
      socialGrowth: 12.5
    },
    insights: [
      'Website traffic increased by 23% compared to previous month',
      'Social media engagement improved by 15%',
      'Top performing content: Product launch announcement'
    ],
    recommendations: [
      'Increase investment in high-performing social media content',
      'Optimize landing pages with low conversion rates',
      'Expand successful SEO keywords strategy'
    ]
  }
];

export const ReportsView = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClient, setSelectedClient] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date()
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [integrations, setIntegrations] = useState(mockIntegrations);
  const [reports, setReports] = useState(mockReports);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    // Simulate API call to refresh data
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const connectedIntegrations = integrations.filter(i => i.connected).length;
  const totalIntegrations = integrations.length;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3Icon },
    { id: 'integrations', label: 'Integrations', icon: SettingsIcon },
    { id: 'templates', label: 'Templates', icon: FileTextIcon },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Reports & Analytics</h1>
          <p className="text-text-secondary mt-1">
            Consolidated reporting across all marketing channels
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className="btn-ghost"
          >
            <RefreshCwIcon className={clsx('w-4 h-4 mr-2', isRefreshing && 'animate-spin')} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            New Report
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-base">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <BarChart3Icon className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-text-primary">{reports.length}</p>
              <p className="text-sm text-text-secondary">Active Reports</p>
            </div>
          </div>
        </div>
        
        <div className="card-base">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-status-success-background rounded-lg flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-status-success" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-text-primary">
                {connectedIntegrations}/{totalIntegrations}
              </p>
              <p className="text-sm text-text-secondary">Integrations</p>
            </div>
          </div>
        </div>
        
        <div className="card-base">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-status-info-background rounded-lg flex items-center justify-center">
              <TrendingUpIcon className="w-6 h-6 text-status-info" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-text-primary">+23%</p>
              <p className="text-sm text-text-secondary">Avg Growth</p>
            </div>
          </div>
        </div>
        
        <div className="card-base">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-status-warning-background rounded-lg flex items-center justify-center">
              <DownloadIcon className="w-6 h-6 text-status-warning" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-text-primary">47</p>
              <p className="text-sm text-text-secondary">Reports Generated</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border-primary">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center',
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-interactive'
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {activeTab === 'dashboard' && (
          <ReportDashboard
            reports={reports}
            integrations={integrations}
            selectedClient={selectedClient}
            onClientChange={setSelectedClient}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        )}
        
        {activeTab === 'integrations' && (
          <IntegrationSettings
            integrations={integrations}
            onIntegrationsChange={setIntegrations}
          />
        )}
        
        {activeTab === 'templates' && (
          <div className="text-center py-12">
            <FileTextIcon className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">Report Templates</h3>
            <p className="text-text-secondary mb-4">
              Create and manage custom report templates for different client needs
            </p>
            <button className="btn-primary">
              <PlusIcon className="w-4 h-4 mr-2" />
              Create Template
            </button>
          </div>
        )}
      </div>

      {/* Create Report Modal */}
      {showCreateModal && (
        <CreateReportModal
          onClose={() => setShowCreateModal(false)}
          onReportCreated={(report) => {
            setReports(prev => [...prev, report]);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
};