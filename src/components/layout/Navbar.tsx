import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src="/crop new logo.png" 
              alt="MLRIT Courts" 
              className="h-10 w-auto group-hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <User className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="font-medium text-gray-700">{user?.name}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-large border border-gray-100 py-2 animate-slide-down">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user?.userType}</p>
                      <p className="text-xs text-gray-400 mt-1">{user?.email}</p>
                    </div>
                    <Link
                      to="/my-bookings"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">My Bookings</span>
                    </Link>
                    {user?.userType === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setIsProfileOpen(false)}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm font-medium">Admin</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {!isAuthenticated && (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-medium hover:shadow-large hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 animate-slide-down">
            <div className="space-y-2">
              {!isAuthenticated ? (
                <div className="flex flex-col space-y-2 px-4 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-center py-3 font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-center py-3 font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="px-4 pt-2 border-t border-gray-100">
                  <Link
                    to="/my-bookings"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 font-medium text-gray-600 hover:text-gray-900"
                  >
                    My Bookings
                  </Link>
                  {user?.userType === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3 font-medium text-gray-600 hover:text-gray-900"
                    >
                      Admin
                    </Link>
                  )}
                  <div className="py-3 border-t border-gray-100 mt-2">
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.userType}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;