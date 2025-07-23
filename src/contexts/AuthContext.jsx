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
  console.log('[createUserProfile] checking/creating profile for userId:', userId);
  try {
    console.log('[createUserProfile] Running SELECT query...');
    try {
      console.log('Fetching user profile...');
      const { data: existingProfile, error: fetchError } = await selectWithTimeout();
      console.log('Fetched:', existingProfile, 'Error:', fetchError);
    } catch (error) {
      console.error('SELECT failed or timed out:', error);
    }


    console.log('[createUserProfile] SELECT completed. Data:', existingProfile, 'Error:', fetchError);

    if (fetchError) {
      console.warn('[createUserProfile] Fetch error:', fetchError);
    }

    if (!existingProfile) {
      console.log('[createUserProfile] No profile found. Creating new profile...');
      const { error: insertError } = await supabase.from('user_profiles').insert({
        id: userId,
        workspace_id: DEMO_WORKSPACE_ID,
        name: 'Demo User',
        role: 'administrator',
      });

      console.log('[createUserProfile] INSERT complete. Error:', insertError);

      if (insertError) {
        console.error('[createUserProfile] Insert error:', insertError);
      } else {
        console.log('[createUserProfile] Profile created successfully.');
      }
    } else {
      console.log('[createUserProfile] Profile already exists.');
    }

    console.log('[createUserProfile] Exiting function.');
  } catch (error) {
    console.error('[createUserProfile] Exception:', error);
  }
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('[AuthProvider] useEffect fired.');

    const getInitialSession = async () => {
      console.log('[getInitialSession] Checking Supabase session...');
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('[getInitialSession] Session:', session);

        if (error) {
          console.warn('[getInitialSession] Session error:', error);
        }

        if (session?.user) {
          console.log('[getInitialSession] User found. Creating profile...');
          await createUserProfile(session.user.id);

          const userWithWorkspace = {
            ...session.user,
            user_metadata: {
              ...session.user.user_metadata,
              workspace_id: DEMO_WORKSPACE_ID,
            },
          };

          setUser(userWithWorkspace);
          console.log('[getInitialSession] setUser called with user:', userWithWorkspace);
        } else {
          console.log('[getInitialSession] No user session found.');
          setUser(null);
        }
      } catch (error) {
        console.error('[getInitialSession] Exception:', error);
        setUser(null);
      } finally {
        console.log('[getInitialSession] Finished. Setting isLoading to false.');
        setIsLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[onAuthStateChange] Event:', event, 'Session:', session);

        if (session?.user) {
          console.log('[onAuthStateChange] User ID:', session.user.id);
          await createUserProfile(session.user.id);
          console.log('[onAuthStateChange] createUserProfile completed.');

          const userWithWorkspace = {
            ...session.user,
            user_metadata: {
              ...session.user.user_metadata,
              workspace_id: DEMO_WORKSPACE_ID,
            },
          };

          console.log('[onAuthStateChange] userWithWorkspace:', userWithWorkspace);
          setUser(userWithWorkspace);
          console.log('[onAuthStateChange] setUser called.');
        } else {
          setUser(null);
          console.log('[onAuthStateChange] No session. setUser(null) called.');
        }

        setIsLoading(false);
        console.log('[onAuthStateChange] setIsLoading(false) called.');
      }
    );

    return () => {
      console.log('[AuthProvider] Cleaning up subscription.');
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    console.log('[login] Attempting login for:', email);
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('[login] Supabase login error:', error);
        throw error;
      }

      if (!data.user) {
        throw new Error('No user returned from signIn');
      }

      console.log('[login] Login successful. Creating profile...');
      await createUserProfile(data.user.id);

      const userWithWorkspace = {
        ...data.user,
        user_metadata: {
          ...data.user.user_metadata,
          workspace_id: DEMO_WORKSPACE_ID,
        },
      };

      setUser(userWithWorkspace);
      console.log('[login] setUser called with user:', userWithWorkspace);
    } catch (error) {
      console.error('[login] Exception:', error);
      throw error;
    } finally {
      console.log('[login] Done. Setting isLoading to false.');
      setIsLoading(false);
    }
  };

  const logout = async () => {
    console.log('[logout] Logging out user...');
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('[logout] Supabase sign out error:', error);
        throw error;
      }
      setUser(null);
      console.log('[logout] setUser(null) called.');
    } catch (error) {
      console.error('[logout] Exception:', error);
      throw error;
    } finally {
      console.log('[logout] Done. Setting isLoading to false.');
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
  };

  console.log('[AuthProvider] Rendered. isLoading:', isLoading, 'user:', user);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
