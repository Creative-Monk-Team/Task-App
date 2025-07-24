import React, { useState } from 'react';
import { 
  DownloadIcon, 
  ShareIcon, 
  CalendarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  MousePointerClickIcon,
  EyeIcon,
  HeartIcon,
  MessageCircleIcon
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { exportReportToPDF } from '../../utils/reportExport';
import clsx from 'clsx';


// Mock chart data
const websiteTrafficData = [
  { date: '2024-01-01', sessions: 1200, users: 980, pageviews: 3400 },
  { date: '2024-01-08', sessions: 1350, users: 1100, pageviews: 3800 },
  { date: '2024-01-15', sessions: 1500, users: 1250, pageviews: 4200 },
  { date: '2024-01-22', sessions: 1680, users: 1400, pageviews: 4600 },
  { date: '2024-01-29', sessions: 1820, users: 1520, pageviews: 5100 },
];

const socialMediaData = [
  { platform: 'Facebook', reach: 15400, engagement: 1240, followers: 8500 },
  { platform: 'Instagram', reach: 12800, engagement: 2100, followers: 12300 },
  { platform: 'Twitter', reach: 8600, engagement: 680, followers: 4200 },
  { platform: 'LinkedIn', reach: 5200, engagement: 420, followers: 2800 },
];

const topPagesData = [
  { page: '/homepage', views: 8500, bounceRate: 32 },
  { page: '/products', views: 6200, bounceRate: 28 },
  { page: '/about', views: 4800, bounceRate: 45 },
  { page: '/contact', views: 3200, bounceRate: 38 },
  { page: '/blog', views: 2900, bounceRate: 52 },
];

const conversionFunnelData = [
  { stage: 'Visitors', count: 15420, percentage: 100 },
  { stage: 'Product Views', count: 8200, percentage: 53 },
  { stage: 'Add to Cart', count: 2100, percentage: 14 },
  { stage: 'Checkout', count: 850, percentage: 6 },
  { stage: 'Purchase', count: 490, percentage: 3 },
];

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export const ReportDashboard = ({
  reports,
  integrations,
  selectedClient,
  onClientChange,
  dateRange,
  onDateRangeChange
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportReportToPDF({
        clientName: 'TechCorp Inc.',
        reportPeriod: dateRange,
        data: {
          websiteTraffic: websiteTrafficData,
          socialMedia: socialMediaData,
          topPages: topPagesData,
          conversions: conversionFunnelData
        }
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatPercentage = (num) => {
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select
            value={selectedClient}
            onChange={(e) => onClientChange(e.target.value)}
            className="input-base"
          >
            <option value="all">All Clients</option>
            <option value="1">TechCorp Inc.</option>
            <option value="2">StartupXYZ</option>
            <option value="3">RetailCo</option>
          </select>

          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4 text-text-tertiary" />
            <input
              type="date"
              value={dateRange.start.toISOString().split('T')[0]}
              onChange={(e) => onDateRangeChange({
                ...dateRange,
                start: new Date(e.target.value)
              })}
              className="input-base"
            />
            <span className="text-text-tertiary">to</span>
            <input
              type="date"
              value={dateRange.end.toISOString().split('T')[0]}
              onChange={(e) => onDateRangeChange({
                ...dateRange,
                end: new Date(e.target.value)
              })}
              className="input-base"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="btn-ghost">
            <ShareIcon className="w-4 h-4 mr-2" />
            Share
          </button>
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="btn-primary"
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-base">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Website Sessions</p>
              <p className="text-2xl font-bold text-text-primary">15.4K</p>
              <div className="flex items-center mt-1">
                <TrendingUpIcon className="w-4 h-4 text-status-success mr-1" />
                <span className="text-sm text-status-success-text">+23.5%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <MousePointerClickIcon className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card-base">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Unique Users</p>
              <p className="text-2xl font-bold text-text-primary">12.3K</p>
              <div className="flex items-center mt-1">
                <TrendingUpIcon className="w-4 h-4 text-status-success mr-1" />
                <span className="text-sm text-status-success-text">+18.2%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-status-info-background rounded-lg flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-status-info" />
            </div>
          </div>
        </div>

        <div className="card-base">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Social Reach</p>
              <p className="text-2xl font-bold text-text-primary">45.6K</p>
              <div className="flex items-center mt-1">
                <TrendingUpIcon className="w-4 h-4 text-status-success mr-1" />
                <span className="text-sm text-status-success-text">+12.8%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-status-success-background rounded-lg flex items-center justify-center">
              <EyeIcon className="w-6 h-6 text-status-success" />
            </div>
          </div>
        </div>

        <div className="card-base">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Conversion Rate</p>
              <p className="text-2xl font-bold text-text-primary">3.2%</p>
              <div className="flex items-center mt-1">
                <TrendingDownIcon className="w-4 h-4 text-status-error mr-1" />
                <span className="text-sm text-status-error-text">-2.1%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-status-warning-background rounded-lg flex items-center justify-center">
              <TrendingUpIcon className="w-6 h-6 text-status-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Website Traffic Trend */}
        <div className="card-base">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Website Traffic Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={websiteTrafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="sessions" stroke="#f97316" strokeWidth={2} name="Sessions" />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Social Media Performance */}
        <div className="card-base">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Social Media Reach</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={socialMediaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="platform" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar dataKey="reach" fill="#f97316" name="Reach" />
              <Bar dataKey="engagement" fill="#3b82f6" name="Engagement" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Pages */}
        <div className="card-base">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Top Performing Pages</h3>
          <div className="space-y-3">
            {topPagesData.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between p-3 bg-background-component-subtle rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{page.page}</p>
                    <p className="text-sm text-text-secondary">{formatNumber(page.views)} views</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">{page.bounceRate}%</p>
                  <p className="text-xs text-text-secondary">Bounce Rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="card-base">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Conversion Funnel</h3>
          <div className="space-y-2">
            {conversionFunnelData.map((stage, index) => (
              <div key={stage.stage} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-text-primary">{stage.stage}</span>
                  <span className="text-sm text-text-secondary">
                    {formatNumber(stage.count)} ({stage.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${stage.percentage}%`,
                      backgroundColor: COLORS[index % COLORS.length]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-base">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Key Insights</h3>
          <div className="space-y-3">
            {reports[0]?.insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-status-info-background rounded-lg">
                <div className="w-6 h-6 bg-status-info rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <TrendingUpIcon className="w-3 h-3 text-white" />
                </div>
                <p className="text-sm text-text-primary">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-base">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Recommendations</h3>
          <div className="space-y-3">
            {reports[0]?.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-status-warning-background rounded-lg">
                <div className="w-6 h-6 bg-status-warning rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <p className="text-sm text-text-primary">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};