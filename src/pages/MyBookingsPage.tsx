import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, MoreVertical, X, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface Booking {
  id: string;
  courtName: string;
  courtType: string;
  location: string;
  date: string;
  timeSlots: string[];
  totalAmount: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  bookedAt: string;
}

const MyBookingsPage: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null);

  useEffect(() => {
    // Mock bookings data
    const mockBookings: Booking[] = [
      {
        id: '1',
        courtName: 'Main Basketball Court',
        courtType: 'Basketball',
        location: 'Sports Complex A',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
        timeSlots: ['18:00', '19:00'],
        totalAmount: 400,
        status: 'confirmed',
        bookedAt: new Date().toISOString(),
      },
      {
        id: '2',
        courtName: 'Badminton Court 1',
        courtType: 'Badminton',
        location: 'Sports Complex B',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
        timeSlots: ['07:00'],
        totalAmount: 150,
        status: 'confirmed',
        bookedAt: new Date().toISOString(),
      },
      {
        id: '3',
        courtName: 'Tennis Court',
        courtType: 'Tennis',
        location: 'Outdoor Complex',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days ago
        timeSlots: ['16:00', '17:00'],
        totalAmount: 500,
        status: 'completed',
        bookedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '4',
        courtName: 'Badminton Court 2',
        courtType: 'Badminton',
        location: 'Sports Complex B',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days ago
        timeSlots: ['09:00'],
        totalAmount: 150,
        status: 'cancelled',
        bookedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    setBookings(mockBookings);
  }, []);

  const upcomingBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookingDate >= today && booking.status === 'confirmed';
  });

  const pastBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookingDate < today || booking.status !== 'confirmed';
  });

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' as const }
          : booking
      )
    );
    
    addNotification({
      type: 'success',
      title: 'Booking cancelled',
      message: 'Your booking has been cancelled successfully.',
    });
    
    setShowCancelModal(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const currentBookings = selectedTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="min-h-screen bg-gray-25 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your court reservations and booking history.</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 animate-slide-up">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setSelectedTab('upcoming')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === 'upcoming'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Upcoming ({upcomingBookings.length})
              </button>
              <button
                onClick={() => setSelectedTab('past')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === 'past'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Past ({pastBookings.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {currentBookings.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {selectedTab === 'upcoming' ? 'No upcoming bookings' : 'No past bookings'}
              </h3>
              <p className="text-gray-600 mb-4">
                {selectedTab === 'upcoming'
                  ? "You don't have any upcoming court reservations."
                  : "You haven't made any bookings yet."}
              </p>
              <Button onClick={() => window.location.href = '/courts'}>
                Browse Courts
              </Button>
            </Card>
          ) : (
            currentBookings.map((booking, index) => (
              <Card
                key={booking.id}
                className="p-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.courtName}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {booking.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(booking.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {booking.timeSlots.join(', ')}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-semibold text-gray-900">
                          ₹{booking.totalAmount}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          ({booking.timeSlots.length} hour{booking.timeSlots.length > 1 ? 's' : ''})
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Booked on{' '}
                        {new Date(booking.bookedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {selectedTab === 'upcoming' && booking.status === 'confirmed' && (
                    <div className="mt-4 md:mt-0 md:ml-6 flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCancelModal(booking.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Cancel Confirmation Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Cancel Booking</h3>
                <button
                  onClick={() => setShowCancelModal(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>
              
              <div className="flex space-x-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowCancelModal(null)}
                >
                  Keep Booking
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleCancelBooking(showCancelModal)}
                >
                  Cancel Booking
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;