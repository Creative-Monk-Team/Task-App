import React, { useState } from 'react';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  AlertCircleIcon,
  RefreshCwIcon,
  SettingsIcon,
  ExternalLinkIcon,
  PlusIcon
} from 'lucide-react';
import clsx from 'clsx';


const platformInfo = {
  google_analytics: {
    name: 'Google Analytics',
    description: 'Website traffic, user behavior, and conversion tracking',
    icon: '📊',
    color: 'bg-orange-100 text-orange-800',
    setupUrl: 'https://analytics.google.com'
  },
  search_console: {
    name: 'Google Search Console',
    description: 'Search performance, keywords, and SEO insights',
    icon: '🔍',
    color: 'bg-blue-100 text-blue-800',
    setupUrl: 'https://search.google.com/search-console'
  },
  facebook: {
    name: 'Facebook',
    description: 'Page insights, post performance, and audience data',
    icon: '📘',
    color: 'bg-blue-100 text-blue-800',
    setupUrl: 'https://developers.facebook.com'
  },
  instagram: {
    name: 'Instagram',
    description: 'Profile insights, story metrics, and engagement data',
    icon: '📷',
    color: 'bg-pink-100 text-pink-800',
    setupUrl: 'https://developers.facebook.com/docs/instagram-api'
  }
};

export const IntegrationSettings = ({
  integrations,
  onIntegrationsChange
}) => {
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);

  const handleConnect = async (platform) => {
    setConnectingPlatform(platform);
    
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const updatedIntegrations = integrations.map(integration => 
      integration.platform === platform
        ? {
            ...integration,
            connected: true,
            lastSync: new Date(),
            error: null,
            accountInfo: {
              accountId: `${platform}-demo-account`,
              accountName: `Demo ${platformInfo[platform].name} Account`
            }
          }
        : integration
    );
    
    onIntegrationsChange(updatedIntegrations);
    setConnectingPlatform(null);
  };

  const handleDisconnect = (platform) => {
    if (window.confirm(`Are you sure you want to disconnect ${platformInfo[platform].name}?`)) {
      const updatedIntegrations = integrations.map(integration => 
        integration.platform === platform
          ? {
              ...integration,
              connected: false,
              lastSync: null,
              error: null,
              accountInfo: undefined
            }
          : integration
      );
      
      onIntegrationsChange(updatedIntegrations);
    }
  };

  const handleRefresh = async (platform) => {
    const updatedIntegrations = integrations.map(integration => 
      integration.platform === platform
        ? {
            ...integration,
            lastSync: new Date(),
            error: null
          }
        : integration
    );
    
    onIntegrationsChange(updatedIntegrations);
  };

  const getStatusIcon = (integration) => {
    if (integration.connected && !integration.error) {
      return <CheckCircleIcon className="w-5 h-5 text-status-success" />;
    } else if (integration.error) {
      return <AlertCircleIcon className="w-5 h-5 text-status-warning" />;
    } else {
      return <XCircleIcon className="w-5 h-5 text-neutral-400" />;
    }
  };

  const getStatusText = (integration) => {
    if (integration.connected && !integration.error) {
      return 'Connected';
    } else if (integration.error) {
      return 'Error';
    } else {
      return 'Not Connected';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Platform Integrations</h2>
          <p className="text-text-secondary mt-1">
            Connect your marketing platforms to consolidate reporting data
          </p>
        </div>
        <button className="btn-secondary">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Integration
        </button>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => {
          const platform = platformInfo[integration.platform];
          const isConnecting = connectingPlatform === integration.platform;
          
          return (
            <div key={integration.platform} className="card-base border border-border-primary">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{platform.icon}</div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{platform.name}</h3>
                    <p className="text-sm text-text-secondary">{platform.description}</p>
                  </div>
                </div>
                {getStatusIcon(integration)}
              </div>

              {/* Status */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-secondary">Status</span>
                  <span className={clsx(
                    'text-sm font-medium',
                    integration.connected && !integration.error ? 'text-status-success-text' :
                    integration.error ? 'text-status-warning-text' :
                    'text-neutral-600'
                  )}>
                    {getStatusText(integration)}
                  </span>
                </div>
                
                {integration.connected && integration.accountInfo && (
                  <div className="text-sm text-text-secondary">
                    <p>Account: {integration.accountInfo.accountName}</p>
                    {integration.lastSync && (
                      <p>Last sync: {integration.lastSync.toLocaleString()}</p>
                    )}
                  </div>
                )}
                
                {integration.error && (
                  <div className="mt-2 p-2 bg-status-warning-background rounded-lg">
                    <p className="text-sm text-status-warning-text">{integration.error}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {integration.connected ? (
                  <>
                    <button
                      onClick={() => handleRefresh(integration.platform)}
                      className="btn-ghost flex-1"
                    >
                      <RefreshCwIcon className="w-4 h-4 mr-2" />
                      Refresh
                    </button>
                    <button
                      onClick={() => handleDisconnect(integration.platform)}
                      className="btn-ghost text-status-error-text hover:bg-status-error-background"
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleConnect(integration.platform)}
                      disabled={isConnecting}
                      className="btn-primary flex-1"
                    >
                      {isConnecting ? 'Connecting...' : 'Connect'}
                    </button>
                    <a
                      href={platform.setupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                    >
                      <ExternalLinkIcon className="w-4 h-4" />
                    </a>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Integration Guide */}
      <div className="card-base bg-background-component-subtle">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Integration Setup Guide</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <div>
              <h4 className="font-medium text-text-primary">Prepare Your Accounts</h4>
              <p className="text-sm text-text-secondary">
                Ensure you have admin access to all platforms you want to connect
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <div>
              <h4 className="font-medium text-text-primary">Connect Platforms</h4>
              <p className="text-sm text-text-secondary">
                Click "Connect" and follow the OAuth flow to authorize access
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">3</span>
            </div>
            <div>
              <h4 className="font-medium text-text-primary">Verify Data</h4>
              <p className="text-sm text-text-secondary">
                Check that data is syncing correctly in the Reports dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};