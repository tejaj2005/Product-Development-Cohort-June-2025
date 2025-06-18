import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import ConfettiAnimation from '../components/ui/ConfettiAnimation';

interface Court {
  id: string;
  name: string;
  type: string;
  location: string;
  capacity: number;
  pricePerHour: number;
  image: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const BookingPage: React.FC = () => {
  const { courtId } = useParams<{ courtId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addNotification } = useNotification();

  const [court, setCourt] = useState<Court | null>(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Mock court data - in a real app, this would come from an API
    const mockCourt: Court = {
      id: courtId || '1',
      name: 'Main Basketball Court',
      type: 'Basketball',
      location: 'Sports Complex A',
      capacity: 10,
      pricePerHour: 200,
      image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
    };

    setCourt(mockCourt);
  }, [courtId, isAuthenticated, navigate]);

  useEffect(() => {
    // Mock time slots data
    const mockSlots: TimeSlot[] = [
      { time: '06:00', available: true },
      { time: '07:00', available: true },
      { time: '08:00', available: false },
      { time: '09:00', available: true },
      { time: '10:00', available: true },
      { time: '11:00', available: false },
      { time: '12:00', available: true },
      { time: '13:00', available: true },
      { time: '14:00', available: true },
      { time: '15:00', available: false },
      { time: '16:00', available: true },
      { time: '17:00', available: true },
      { time: '18:00', available: false },
      { time: '19:00', available: true },
      { time: '20:00', available: true },
    ];

    setTimeSlots(mockSlots);
  }, [selectedDate]);

  const handleSlotToggle = (time: string) => {
    setSelectedSlots(prev =>
      prev.includes(time)
        ? prev.filter(slot => slot !== time)
        : [...prev, time]
    );
  };

  const calculateTotal = () => {
    return selectedSlots.length * (court?.pricePerHour || 0);
  };

  const handleBooking = async () => {
    if (selectedSlots.length === 0) {
      addNotification({
        type: 'warning',
        title: 'No time slots selected',
        message: 'Please select at least one time slot to proceed.',
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setShowConfirmation(true);
    setShowConfetti(true);
    
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Booking Confirmed!',
        message: `Your ${court?.name} booking for ${selectedSlots.length} slot(s) has been confirmed.`,
      });
      navigate('/my-bookings');
    }, 3000);
  };

  if (!court) {
    return (
      <div className="min-h-screen bg-gray-25 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading court details...</p>
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-25 flex items-center justify-center relative">
        {showConfetti && <ConfettiAnimation />}
        <Card className="p-12 max-w-md w-full mx-4 text-center animate-scale-up">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6 text-lg">
            Your booking has been successfully processed. You will receive a confirmation email shortly.
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-25 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Courts
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Book {court.name}</h1>
          <p className="text-gray-600">Select your preferred date and time slots</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Court Details */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden animate-slide-up">
              <div className="aspect-video">
                <img
                  src={court.image}
                  alt={court.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{court.name}</h2>
                <div className="grid grid-cols-2 gap-6 text-base">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-primary-500" />
                    {court.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-primary-500" />
                    Up to {court.capacity} players
                  </div>
                  <div className="col-span-2">
                    <span className="text-2xl font-bold text-gray-900">₹{court.pricePerHour}</span>
                    <span className="text-gray-500 ml-2">per hour</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Date Selection */}
            <Card className="p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-primary-500" />
                Select Date
              </h3>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="max-w-xs text-lg p-4"
              />
            </Card>

            {/* Time Slots */}
            <Card className="p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-primary-500" />
                Available Time Slots
              </h3>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && handleSlotToggle(slot.time)}
                    disabled={!slot.available}
                    className={`p-4 rounded-xl text-base font-semibold transition-all duration-200 ${
                      !slot.available
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : selectedSlots.includes(slot.time)
                        ? 'bg-primary-500 text-white shadow-lg scale-105'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:scale-105'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>

              {selectedSlots.length > 0 && (
                <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-200">
                  <p className="text-primary-700 font-medium">
                    <strong>Selected slots:</strong> {selectedSlots.sort().join(', ')}
                  </p>
                </div>
              )}
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card className="p-8 sticky top-24 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-600">Court:</span>
                  <span className="font-semibold">{court.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold">
                    {new Date(selectedDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time slots:</span>
                  <span className="font-semibold">{selectedSlots.length} hour(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rate per hour:</span>
                  <span className="font-semibold">₹{court.pricePerHour}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary-600">₹{calculateTotal()}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8 text-gray-600">
                <p><strong>Booked by:</strong> {user?.name}</p>
                <p><strong>User type:</strong> <span className="capitalize">{user?.userType}</span></p>
                <p><strong>Email:</strong> {user?.email}</p>
              </div>

              <Button
                onClick={handleBooking}
                loading={loading}
                className="w-full text-lg py-4"
                size="lg"
                disabled={selectedSlots.length === 0}
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </Button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By confirming, you agree to our booking terms and cancellation policy.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;