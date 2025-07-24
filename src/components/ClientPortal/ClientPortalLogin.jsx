import React, { useState } from 'react';
import { MailIcon, LogInIcon, ArrowRightIcon } from 'lucide-react';



export const ClientPortalLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      alert('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate sending magic link
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmailSent(true);
      
      // For demo purposes, automatically "login" after a short delay
      setTimeout(() => {
        onLogin(email);
      }, 2000);
    } catch (error) {
      console.error('Error sending magic link:', error);
      alert('Failed to send login link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-app py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-6">
              <MailIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary">Check Your Email</h2>
            <p className="mt-2 text-text-secondary">
              We've sent a secure login link to <strong>{email}</strong>
            </p>
          </div>
          
          <div className="bg-background-component rounded-lg p-6 border border-border-primary">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-status-info-background rounded-full flex items-center justify-center">
                  <MailIcon className="w-4 h-4 text-status-info" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-primary">What's next?</h3>
                <div className="mt-2 text-sm text-text-secondary">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Check your email inbox</li>
                    <li>Click the secure login link</li>
                    <li>You'll be automatically signed in</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-text-secondary">
              Didn't receive the email?{' '}
              <button 
                onClick={() => setEmailSent(false)}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Try again
              </button>
            </p>
          </div>

          {/* Demo auto-login indicator */}
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary-100 text-primary-800">
              <div className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></div>
              Demo: Auto-logging you in...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-app py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">B</span>
          </div>
          <h2 className="text-3xl font-bold text-text-primary">Client Portal Access</h2>
          <p className="mt-2 text-text-secondary">
            Enter your email to receive a secure login link
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
              Email Address
            </label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-base pl-10 w-full"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                'Sending Link...'
              ) : (
                <>
                  <LogInIcon className="w-4 h-4" />
                  Send Secure Login Link
                </>
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-text-secondary">
              Demo emails: john@techcorp.com, sarah@startupxyz.com
            </p>
          </div>
        </form>

        <div className="bg-background-component rounded-lg p-4 border border-border-primary">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-status-info-background rounded-full flex items-center justify-center">
                <span className="text-status-info text-xs font-bold">?</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-text-primary">Secure Access</h3>
              <p className="mt-1 text-sm text-text-secondary">
                We'll send you a secure, one-time login link. No passwords required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};