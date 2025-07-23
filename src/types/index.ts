// Core system types for Bolt Agency Operating System

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  isOnline: boolean;
  status: UserStatus;
  billableRate?: number;
  clockedIn: boolean;
  clockInTime?: Date;
}

export type UserRole = 'administrator' | 'manager' | 'team_member' | 'client';

export type UserStatus = 'online' | 'away' | 'busy' | 'in_meeting' | 'do_not_disturb';

export interface Workspace {
  id: string;
  name: string;
  logo?: string;
  brandColors: {
    primary: string;
    secondary: string;
  };
  subdomain?: string;
}

export interface Space {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
}

export interface Folder {
  id: string;
  spaceId: string;
  name: string;
  clientName?: string;
  description?: string;
  isArchived: boolean;
}

export interface List {
  id: string;
  folderId: string;
  name: string;
  description?: string;
  type: 'project' | 'retainer' | 'internal';
  budget?: number;
  status: ProjectStatus;
  startDate?: Date;
  dueDate?: Date;
  assignedUsers: string[];
}

export type ProjectStatus = 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';

export interface Task {
  id: string;
  listId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignees: string[];
  followers: string[];
  startDate?: Date;
  dueDate?: Date;
  timeEstimate?: number; // in hours
  timeTracked: number; // in hours
  isVisibleToClient: boolean;
  dependencies: TaskDependency[];
  attachments: Attachment[];
  comments: Comment[];
  subtasks: Subtask[];
  checklist: ChecklistItem[];
  createdAt: Date;
  updatedAt: Date;
}

export type TaskStatus = 'todo' | 'in_progress' | 'internal_review' | 'in_revision' | 'client_review' | 'blocked' | 'approved' | 'complete';

export type TaskPriority = 'p1' | 'p2' | 'p3' | 'p4';

export interface TaskDependency {
  id: string;
  dependentTaskId: string;
  type: 'finish_to_start' | 'start_to_start' | 'finish_to_finish' | 'start_to_finish';
}

export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
  assignee?: string;
  dueDate?: Date;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  isInternal: boolean;
  createdAt: Date;
  updatedAt?: Date;
  attachments: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface TimeEntry {
  id: string;
  userId: string;
  taskId?: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  isBillable: boolean;
  isApproved?: boolean;
  approvedBy?: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tasks: Omit<Task, 'id' | 'listId' | 'createdAt' | 'updatedAt'>[];
  estimatedDuration: number; // in days
  estimatedBudget?: number;
}

export interface ClientPortalSettings {
  isEnabled: boolean;
  customDomain?: string;
  brandColors: {
    primary: string;
    secondary: string;
  };
  logo?: string;
  welcomeMessage?: string;
  visibleWidgets: string[];
}

export interface DashboardWidget {
  id: string;
  type: 'project_progress' | 'budget_vs_actual' | 'team_capacity' | 'recent_activity' | 'upcoming_deadlines';
  title: string;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
  config: Record<string, any>;
}