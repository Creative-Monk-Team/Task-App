import React, { createContext, useContext, useState } from 'react';
import { useSpaces, useFolders, useLists, useTasks, useTimeEntries } from '../hooks/useDatabase.ts';
import { useAuth } from './AuthContext.jsx';

const AppContext = createContext(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeSpace, setActiveSpace] = useState(null);
  const [activeFolder, setActiveFolder] = useState(null);
  const [activeList, setActiveList] = useState(null);
  const [activeTimer, setActiveTimer] = useState(null);
  const [isClocked, setIsClocked] = useState(false);

  // Use database hooks
  const workspaceId = user?.user_metadata?.workspace_id || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
  const { spaces, loading: spacesLoading, createSpace, updateSpace, deleteSpace } = useSpaces(workspaceId);
  const { folders, loading: foldersLoading, createFolder, updateFolder, deleteFolder } = useFolders();
  const { lists, loading: listsLoading, createList, updateList, deleteList } = useLists();
  const { tasks, loading: tasksLoading, createTask, updateTask, deleteTask } = useTasks(activeList?.id);
  const { timeEntries, createTimeEntry } = useTimeEntries(user?.id);

  const startTimer = (taskId, description) => {
    setActiveTimer({
      taskId,
      startTime: new Date(),
      description
    });
  };

  const stopTimer = () => {
    if (activeTimer) {
      const duration = Math.floor((new Date().getTime() - activeTimer.startTime.getTime()) / 1000 / 60);
      
      if (user) {
        createTimeEntry({
          user_id: user.id,
          task_id: activeTimer.taskId,
          description: activeTimer.description,
          start_time: activeTimer.startTime.toISOString(),
          end_time: new Date().toISOString(),
          duration_minutes: duration,
          is_billable: true
        });
      }
    }
    setActiveTimer(null);
  };

  const clockIn = () => {
    setIsClocked(true);
  };

  const clockOut = () => {
    setIsClocked(false);
  };

  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView,
      spaces,
      folders,
      lists,
      tasks,
      timeEntries,
      spacesLoading,
      foldersLoading,
      listsLoading,
      tasksLoading,
      activeSpace,
      activeFolder,
      activeList,
      setActiveSpace,
      setActiveFolder,
      setActiveList,
      createSpace,
      updateSpace,
      deleteSpace,
      createFolder,
      updateFolder,
      deleteFolder,
      createList,
      updateList,
      deleteList,
      createTask,
      updateTask,
      deleteTask,
      activeTimer,
      workspaceId,
      startTimer,
      stopTimer,
      isClocked,
      clockIn,
      clockOut
    }}>
      {children}
    </AppContext.Provider>
  );
};