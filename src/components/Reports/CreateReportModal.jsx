import React, { useState } from 'react';
import { XIcon, CalendarIcon, UsersIcon, BarChart3Icon } from 'lucide-react';

export const CreateReportModal = ({ onClose, onReportCreated }) => {
  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    platforms: {
      googleAnalytics: true,
      searchConsole: true,
      facebook: false,
      instagram: true
    },
    reportType: 'comprehensive'
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const clients = [
    { id: '1', name: 'TechCorp Inc.' },
    { id: '2', name: 'StartupXYZ' },
    { id: '3', name: 'RetailCo' }
  ];

  const reportTypes = [
    {
      id: 'comprehensive',
      name: 'Comprehensive Report',
      description: 'Full analytics across all connected platforms',
      icon: BarChart3Icon
    },
    {
      id: 'social_only',
      name: 'Social Media Only',
      description: 'Focus on Facebook and Instagram performance',
      icon: UsersIcon
    },
    {
      id: 'web_only',
      name: 'Website Analytics',
      description: 'Google Analytics and Search Console data',
      icon: BarChart3Icon
    },
    {
      id: 'custom',
      name: 'Custom Report',
      description: 'Select specific platforms and metrics',
      icon: BarChart3Icon
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.clientId || !formData.clientName) {
      alert('Please select a client');
      return;
    }

    setIsGenerating(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      const newReport = {
        id: Date.now().toString(),
        clientId: formData.clientId,
        clientName: formData.clientName,
        reportPeriod: {
          start: new Date(formData.startDate),
          end: new Date(formData.endDate)
        },
        generatedAt: new Date(),
        analytics: {},
        summary: {
          totalSessions: Math.floor(Math.random() * 20000) + 10000,
          totalUsers: Math.floor(Math.random() * 15000) + 8000,
          totalReach: Math.floor(Math.random() * 50000) + 30000,
          totalEngagement: Math.floor(Math.random() * 5000) + 2000,
          conversionRate: Math.random() * 5 + 1,
          socialGrowth: Math.random() * 20 + 5
        },
        insights: [
          'Website traffic increased significantly during the reporting period',
          'Social media engagement showed strong growth',
          'Mobile traffic continues to dominate desktop usage'
        ],
        recommendations: [
          'Increase investment in high-performing content types',
          'Optimize mobile user experience for better conversions',
          'Expand successful social media strategies'
        ]
      };

      onReportCreated(newReport);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="modal-base max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <h2 className="text-xl font-semibold text-text-primary">Generate New Report</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <XIcon className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Select Client *</label>
            <select
              value={formData.clientId}
              onChange={(e) => {
                const selectedClient = clients.find(c => c.id === e.target.value);
                setFormData(prev => ({
                  ...prev,
                  clientId: e.target.value,
                  clientName: selectedClient?.name || ''
                }));
              }}
              className="input-base w-full"
              required
            >
              <option value="">Choose a client...</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Report Period</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-text-secondary mb-1">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="input-base w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  className="input-base w-full"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Report Type</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <label
                    key={type.id}
                    className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.reportType === type.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-border-primary hover:border-border-interactive'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportType"
                      value={type.id}
                      checked={formData.reportType === type.id}
                      onChange={(e) => setFormData(prev => ({ ...prev, reportType: e.target.value }))}
                      className="sr-only"
                    />
                    <Icon className="w-5 h-5 text-primary-600 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium text-text-primary">{type.name}</div>
                      <div className="text-sm text-text-secondary">{type.description}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {formData.reportType === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Include Platforms</label>
              <div className="space-y-2">
                {[{ key: 'googleAnalytics', label: 'Google Analytics', icon: '📊' },
                  { key: 'searchConsole', label: 'Google Search Console', icon: '🔍' },
                  { key: 'facebook', label: 'Facebook', icon: '📘' },
                  { key: 'instagram', label: 'Instagram', icon: '📷' }].map((platform) => (
                  <label key={platform.key} className="flex items-center p-2 hover:bg-background-component-subtle rounded-lg">
                    <input
                      type="checkbox"
                      checked={formData.platforms[platform.key]}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        platforms: {
                          ...prev.platforms,
                          [platform.key]: e.target.checked
                        }
                      }))}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-border-interactive rounded mr-3"
                    />
                    <span className="text-lg mr-2">{platform.icon}</span>
                    <span className="text-sm text-text-primary">{platform.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                <div>
                  <p className="font-medium text-primary-800">Generating Report...</p>
                  <p className="text-sm text-primary-600">Collecting data from connected platforms and analyzing metrics</p>
                </div>
              </div>
            </div>
          )}
        </form>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border-primary">
          <button type="button" onClick={onClose} className="btn-ghost" disabled={isGenerating}>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formData.clientId || isGenerating}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </div>
    </div>
  );
};