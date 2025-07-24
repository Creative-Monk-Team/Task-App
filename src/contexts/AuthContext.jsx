import React, { createContext, useContext, useEffect, useState } from 'react';

import { supabase } from '../lib/supabase';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const DEMO_WORKSPACE_ID = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

const selectWithTimeout = async () => {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('SELECT timed out')), 5000)
  );

  const query = supabase
    .from('user_profiles')
    .select('id')
    .eq('id', userId)
    .single();

  return Promise.race([query, timeout]);
};


const createUserProfile = async (userId) => {
  try {
    selectWithTimeout();
    if (!existingProfile) {
      // Create user profile
      const { error } = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          workspace_id: DEMO_WORKSPACE_ID,
          name: 'Demo User',
          role: 'administrator'
        });

      if (error) {
        console.error('Error creating user profile:', error);
      }
    }
  } catch (error) {
    console.error('Error checking/creating user profile:', error);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await createUserProfile(session.user.id);
          const userWithWorkspace = {
            ...session.user,
            user_metadata: {
              ...session.user.user_metadata,
              workspace_id: DEMO_WORKSPACE_ID
            }
          };
          setUser(userWithWorkspace);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await createUserProfile(session.user.id);
          const userWithWorkspace = {
            ...session.user,
            user_metadata: {
              ...session.user.user_metadata,
              workspace_id: DEMO_WORKSPACE_ID
            }
          };
          setUser(userWithWorkspace);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Create user profile and set workspace
      await createUserProfile(data.user.id);
      const userWithWorkspace = {
        ...data.user,
        user_metadata: {
          ...data.user.user_metadata,
          workspace_id: DEMO_WORKSPACE_ID
        }
      };
      setUser(userWithWorkspace);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};