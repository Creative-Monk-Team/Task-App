// Reporting and analytics types
export interface AnalyticsData {
  id: string;
  clientId: string;
  platform: 'google_analytics' | 'search_console' | 'facebook' | 'instagram';
  dateRange: {
    start: Date;
    end: Date;
  };
  metrics: Record<string, number>;
  dimensions: Record<string, any>;
  lastUpdated: Date;
}

export interface GoogleAnalyticsData extends AnalyticsData {
  platform: 'google_analytics';
  metrics: {
    sessions: number;
    users: number;
    pageviews: number;
    bounceRate: number;
    avgSessionDuration: number;
    goalCompletions: number;
    conversionRate: number;
  };
  dimensions: {
    topPages: Array<{ page: string; views: number }>;
    trafficSources: Array<{ source: string; sessions: number }>;
    deviceTypes: Array<{ device: string; sessions: number }>;
  };
}

export interface SearchConsoleData extends AnalyticsData {
  platform: 'search_console';
  metrics: {
    clicks: number;
    impressions: number;
    ctr: number;
    avgPosition: number;
  };
  dimensions: {
    topQueries: Array<{ query: string; clicks: number; impressions: number; ctr: number; position: number }>;
    topPages: Array<{ page: string; clicks: number; impressions: number }>;
  };
}

export interface FacebookData extends AnalyticsData {
  platform: 'facebook';
  metrics: {
    reach: number;
    impressions: number;
    engagement: number;
    likes: number;
    shares: number;
    comments: number;
    followers: number;
    followerGrowth: number;
  };
  dimensions: {
    topPosts: Array<{ id: string; content: string; engagement: number; reach: number }>;
    audienceDemographics: {
      ageGroups: Array<{ age: string; percentage: number }>;
      genders: Array<{ gender: string; percentage: number }>;
      locations: Array<{ location: string; percentage: number }>;
    };
  };
}

export interface InstagramData extends AnalyticsData {
  platform: 'instagram';
  metrics: {
    reach: number;
    impressions: number;
    engagement: number;
    likes: number;
    comments: number;
    saves: number;
    shares: number;
    followers: number;
    followerGrowth: number;
    storyViews: number;
  };
  dimensions: {
    topPosts: Array<{ id: string; imageUrl: string; likes: number; comments: number; engagement: number }>;
    hashtagPerformance: Array<{ hashtag: string; reach: number; impressions: number }>;
    audienceInsights: {
      topLocations: Array<{ location: string; percentage: number }>;
      activeHours: Array<{ hour: number; activity: number }>;
    };
  };
}

export interface ClientReport {
  id: string;
  clientId: string;
  clientName: string;
  reportPeriod: {
    start: Date;
    end: Date;
  };
  generatedAt: Date;
  analytics: {
    googleAnalytics?: GoogleAnalyticsData;
    searchConsole?: SearchConsoleData;
    facebook?: FacebookData;
    instagram?: InstagramData;
  };
  summary: {
    totalSessions: number;
    totalUsers: number;
    totalReach: number;
    totalEngagement: number;
    conversionRate: number;
    socialGrowth: number;
  };
  insights: string[];
  recommendations: string[];
}

export interface IntegrationStatus {
  platform: 'google_analytics' | 'search_console' | 'facebook' | 'instagram';
  connected: boolean;
  lastSync: Date | null;
  error: string | null;
  accountInfo?: {
    accountId: string;
    accountName: string;
    profileId?: string;
    profileName?: string;
  };
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  sections: Array<{
    id: string;
    title: string;
    type: 'metrics' | 'chart' | 'table' | 'insights';
    platforms: string[];
    config: Record<string, any>;
  }>;
  isDefault: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface ExportOptions {
  format: 'pdf' | 'excel' | 'csv';
  includeCharts: boolean;
  includeTables: boolean;
  includeInsights: boolean;
  customBranding: {
    logo?: string;
    primaryColor: string;
    companyName: string;
  };
}