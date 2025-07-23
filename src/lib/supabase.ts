import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string;
          name: string;
          logo: string | null;
          primary_color: string;
          secondary_color: string;
          subdomain: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo?: string | null;
          primary_color?: string;
          secondary_color?: string;
          subdomain?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo?: string | null;
          primary_color?: string;
          secondary_color?: string;
          subdomain?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      spaces: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          description: string | null;
          color: string;
          icon: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          name: string;
          description?: string | null;
          color?: string;
          icon?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          name?: string;
          description?: string | null;
          color?: string;
          icon?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      folders: {
        Row: {
          id: string;
          space_id: string;
          name: string;
          client_name: string | null;
          description: string | null;
          is_archived: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          space_id: string;
          name: string;
          client_name?: string | null;
          description?: string | null;
          is_archived?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          space_id?: string;
          name?: string;
          client_name?: string | null;
          description?: string | null;
          is_archived?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      lists: {
        Row: {
          id: string;
          folder_id: string;
          name: string;
          description: string | null;
          type: 'project' | 'retainer' | 'internal';
          budget: number | null;
          status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
          start_date: string | null;
          due_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          folder_id: string;
          name: string;
          description?: string | null;
          type?: 'project' | 'retainer' | 'internal';
          budget?: number | null;
          status?: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
          start_date?: string | null;
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          folder_id?: string;
          name?: string;
          description?: string | null;
          type?: 'project' | 'retainer' | 'internal';
          budget?: number | null;
          status?: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
          start_date?: string | null;
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tasks: {
        Row: {
          id: string;
          list_id: string;
          title: string;
          description: string | null;
          status: 'todo' | 'in_progress' | 'internal_review' | 'in_revision' | 'client_review' | 'blocked' | 'approved' | 'complete';
          priority: 'p1' | 'p2' | 'p3' | 'p4';
          start_date: string | null;
          due_date: string | null;
          time_estimate: number;
          time_tracked: number;
          progress: number;
          is_visible_to_client: boolean;
          tags: string[];
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          list_id: string;
          title: string;
          description?: string | null;
          status?: 'todo' | 'in_progress' | 'internal_review' | 'in_revision' | 'client_review' | 'blocked' | 'approved' | 'complete';
          priority?: 'p1' | 'p2' | 'p3' | 'p4';
          start_date?: string | null;
          due_date?: string | null;
          time_estimate?: number;
          time_tracked?: number;
          progress?: number;
          is_visible_to_client?: boolean;
          tags?: string[];
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          list_id?: string;
          title?: string;
          description?: string | null;
          status?: 'todo' | 'in_progress' | 'internal_review' | 'in_revision' | 'client_review' | 'blocked' | 'approved' | 'complete';
          priority?: 'p1' | 'p2' | 'p3' | 'p4';
          start_date?: string | null;
          due_date?: string | null;
          time_estimate?: number;
          time_tracked?: number;
          progress?: number;
          is_visible_to_client?: boolean;
          tags?: string[];
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          avatar_url: string | null;
          role: 'administrator' | 'manager' | 'team_member' | 'client';
          status: 'online' | 'away' | 'busy' | 'in_meeting' | 'do_not_disturb';
          billable_rate: number | null;
          is_clocked_in: boolean;
          clock_in_time: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          workspace_id: string;
          name: string;
          avatar_url?: string | null;
          role?: 'administrator' | 'manager' | 'team_member' | 'client';
          status?: 'online' | 'away' | 'busy' | 'in_meeting' | 'do_not_disturb';
          billable_rate?: number | null;
          is_clocked_in?: boolean;
          clock_in_time?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          name?: string;
          avatar_url?: string | null;
          role?: 'administrator' | 'manager' | 'team_member' | 'client';
          status?: 'online' | 'away' | 'busy' | 'in_meeting' | 'do_not_disturb';
          billable_rate?: number | null;
          is_clocked_in?: boolean;
          clock_in_time?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}