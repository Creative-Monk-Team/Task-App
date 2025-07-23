// Advanced task management types
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
  customFields: CustomField[];
  tags: string[];
  progress: number; // 0-100
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  completedAt?: Date;
  recurringConfig?: RecurringConfig;
}

export type TaskStatus = 
  | 'todo' 
  | 'in_progress' 
  | 'internal_review' 
  | 'in_revision' 
  | 'client_review' 
  | 'blocked' 
  | 'approved' 
  | 'complete';

export type TaskPriority = 'p1' | 'p2' | 'p3' | 'p4';

export interface TaskDependency {
  id: string;
  dependentTaskId: string;
  type: 'finish_to_start' | 'start_to_start' | 'finish_to_finish' | 'start_to_finish';
  lag?: number; // in days
}

export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
  assignee?: string;
  dueDate?: Date;
  createdAt: Date;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
  createdAt: Date;
}

export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'dropdown' | 'date' | 'currency' | 'boolean';
  value: any;
  options?: string[]; // for dropdown fields
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  isInternal: boolean;
  createdAt: Date;
  updatedAt?: Date;
  attachments: Attachment[];
  mentions: string[];
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

export interface RecurringConfig {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
  interval: number; // every X days/weeks/months
  daysOfWeek?: number[]; // for weekly (0-6, Sunday=0)
  dayOfMonth?: number; // for monthly
  endDate?: Date;
  nextDueDate?: Date;
}

export interface TaskTemplate {
  id: string;
  name: string;
  description: string;
  estimatedHours: number;
  priority: TaskPriority;
  checklist: Omit<ChecklistItem, 'id' | 'createdAt'>[];
  subtasks: Omit<Subtask, 'id' | 'createdAt'>[];
  customFields: Omit<CustomField, 'id'>[];
}

export interface TaskFilter {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  assignees?: string[];
  dueDate?: {
    start?: Date;
    end?: Date;
  };
  tags?: string[];
  search?: string;
}

export interface TaskSort {
  field: 'title' | 'dueDate' | 'priority' | 'status' | 'createdAt' | 'progress';
  direction: 'asc' | 'desc';
}

export interface TaskView {
  id: string;
  name: string;
  type: 'list' | 'board' | 'calendar' | 'gantt';
  filters: TaskFilter;
  sort: TaskSort;
  columns?: string[]; // for list view
  groupBy?: string; // for board view
  isDefault: boolean;
  isPersonal: boolean;
  createdBy: string;
}