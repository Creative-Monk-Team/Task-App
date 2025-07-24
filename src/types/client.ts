// Client management types
export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  workspaceId: string;
  // Portal settings
  portalAccess: boolean;
  portalTheme?: {
    primaryColor: string;
    logo?: string;
  };
  // Project access
  accessibleProjects: string[];
  // Contact info
  address?: string;
  website?: string;
  notes?: string;
}

export interface ClientInvitation {
  id: string;
  clientId: string;
  email: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  used: boolean;
}

export interface ClientPortalSettings {
  workspaceId: string;
  brandingEnabled: boolean;
  customLogo?: string;
  primaryColor: string;
  welcomeMessage?: string;
  showProjectProgress: boolean;
  showTimeTracking: boolean;
  allowFileUploads: boolean;
  allowComments: boolean;
}