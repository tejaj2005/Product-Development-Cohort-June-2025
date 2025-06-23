import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import Card from '../components/ui/Card';

const LoginPage: React.FC = () => {
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const res = await fetch('http://localhost:3001/api/auth/google/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send the ID token to the backend
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      if (res.ok) {
        const data = await res.json();
        loginWithGoogle(data.user);
        addNotification({
          type: 'success',
          title: 'Welcome!',
          message: 'You have been logged in successfully with Google.',
        });
        navigate('/courts');
      } else {
        throw new Error('Failed to verify token with backend');
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Login error',
        message: 'Something went wrong during Google Sign-In. Please try again.',
      });
    }
  };

  const handleError = () => {
    addNotification({
      type: 'error',
      title: 'Login failed',
      message: 'Could not sign in with Google. Please try again.',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account to continue</p>
        </div>

        <Card className="p-8">
          <div className="flex flex-col items-center space-y-6">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              useOneTap
            />
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage; 