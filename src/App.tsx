import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CourtsPage from './pages/CourtsPage';
import BookingPage from './pages/BookingPage';
import MyBookingsPage from './pages/MyBookingsPage';
import AdminPage from './pages/AdminPage';
import NotificationContainer from './components/ui/NotificationContainer';

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen bg-gray-25">
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/courts" element={<CourtsPage />} />
              <Route path="/book/:courtId" element={<BookingPage />} />
              <Route path="/my-bookings" element={<MyBookingsPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
            <NotificationContainer />
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}