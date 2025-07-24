import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { EyeIcon, EyeOffIcon, LogIn, AlertCircle } from 'lucide-react';

export const LoginForm = () => {
  const [email, setEmail] = useState('admin@agency.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      await login(email, password);
    } catch (error) {
      console.error('Authentication failed:', error);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials.');
        } else {
          setError(error.message);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-app py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">B</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-text-primary">
            Welcome to Bolt
          </h2>
          <p className="mt-2 text-center text-sm text-text-secondary">
            The complete agency operating system
          </p>
        </div>
        
        {error && (
          <div className="bg-status-error-background border border-status-error-background rounded-lg p-4 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-status-error flex-shrink-0" />
            <p className="text-sm text-status-error-text">{error}</p>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-base mt-1 w-full"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-base w-full pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-neutral-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-neutral-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-border-interactive rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text-primary">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                'Processing...'
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-text-secondary">
              Demo: admin@agency.com / password
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};