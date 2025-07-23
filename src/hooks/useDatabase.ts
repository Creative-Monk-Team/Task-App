import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase';

type Tables = Database['public']['Tables'];

export function useSpaces(workspaceId: string) {
  const [spaces, setSpaces] = useState<Tables['spaces']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSpaces() {
      if (!workspaceId) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('spaces')
          .select('*')
          .eq('workspace_id', workspaceId || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11')
          .order('created_at', { ascending: true });

        if (error) throw error;
        setSpaces(data || []);
      } catch (err) {
        console.error('Error fetching spaces:', err);
        // For demo purposes, don't show error for missing workspace
        setSpaces([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSpaces();
  }, [workspaceId]);

  const createSpace = async (space: Tables['spaces']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('spaces')
        .insert(space)
        .select()
        .single();

      if (error) throw error;
      setSpaces(prev => [...prev, data]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create space');
    }
  };

  const updateSpace = async (id: string, updates: Tables['spaces']['Update']) => {
    try {
      const { data, error } = await supabase
        .from('spaces')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setSpaces(prev => prev.map(space => space.id === id ? data : space));
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update space');
    }
  };

  const deleteSpace = async (id: string) => {
    try {
      const { error } = await supabase
        .from('spaces')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSpaces(prev => prev.filter(space => space.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete space');
    }
  };

  return {
    spaces,
    loading,
    error,
    createSpace,
    updateSpace,
    deleteSpace
  };
}

export function useFolders(spaceId?: string) {
  const [folders, setFolders] = useState<Tables['folders']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFolders() {
      try {
        let query = supabase.from('folders').select('*');
        
        if (spaceId) {
          query = query.eq('space_id', spaceId);
        }

        const { data, error } = await query.order('created_at', { ascending: true });

        if (error) throw error;
        setFolders(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchFolders();
  }, [spaceId]);

  const createFolder = async (folder: Tables['folders']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('folders')
        .insert(folder)
        .select()
        .single();

      if (error) throw error;
      setFolders(prev => [...prev, data]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create folder');
    }
  };

  const updateFolder = async (id: string, updates: Tables['folders']['Update']) => {
    try {
      const { data, error } = await supabase
        .from('folders')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setFolders(prev => prev.map(folder => folder.id === id ? data : folder));
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update folder');
    }
  };

  const deleteFolder = async (id: string) => {
    try {
      const { error } = await supabase
        .from('folders')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setFolders(prev => prev.filter(folder => folder.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete folder');
    }
  };

  return {
    folders,
    loading,
    error,
    createFolder,
    updateFolder,
    deleteFolder
  };
}

export function useLists(folderId?: string) {
  const [lists, setLists] = useState<Tables['lists']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLists() {
      try {
        let query = supabase.from('lists').select('*');
        
        if (folderId) {
          query = query.eq('folder_id', folderId);
        }

        const { data, error } = await query.order('created_at', { ascending: true });

        if (error) throw error;
        setLists(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchLists();
  }, [folderId]);

  const createList = async (list: Tables['lists']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('lists')
        .insert(list)
        .select()
        .single();

      if (error) throw error;
      setLists(prev => [...prev, data]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create list');
    }
  };

  const updateList = async (id: string, updates: Tables['lists']['Update']) => {
    try {
      const { data, error } = await supabase
        .from('lists')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setLists(prev => prev.map(list => list.id === id ? data : list));
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update list');
    }
  };

  const deleteList = async (id: string) => {
    try {
      const { error } = await supabase
        .from('lists')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setLists(prev => prev.filter(list => list.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete list');
    }
  };

  return {
    lists,
    loading,
    error,
    createList,
    updateList,
    deleteList
  };
}

export function useTasks(listId?: string) {
  const [tasks, setTasks] = useState<Tables['tasks']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        let query = supabase.from('tasks').select('*');
        
        if (listId) {
          query = query.eq('list_id', listId);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;
        setTasks(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [listId]);

  const createTask = async (task: Tables['tasks']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert(task)
        .select()
        .single();

      if (error) throw error;
      setTasks(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  const updateTask = async (id: string, updates: Tables['tasks']['Update']) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTasks(prev => prev.map(task => task.id === id ? data : task));
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask
  };
}

export function useTimeEntries(userId?: string) {
  const [timeEntries, setTimeEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTimeEntries() {
      try {
        let query = supabase.from('time_entries').select('*');
        
        if (userId) {
          query = query.eq('user_id', userId);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;
        setTimeEntries(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchTimeEntries();
    }
  }, [userId]);

  const createTimeEntry = async (timeEntry: any) => {
    try {
      const { data, error } = await supabase
        .from('time_entries')
        .insert(timeEntry)
        .select()
        .single();

      if (error) throw error;
      setTimeEntries(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create time entry');
    }
  };

  return {
    timeEntries,
    loading,
    error,
    createTimeEntry
  };
}