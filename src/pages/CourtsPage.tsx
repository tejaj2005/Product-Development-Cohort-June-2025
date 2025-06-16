import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Clock, MapPin, Filter, Users, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

interface Court {
  id: string;
  name: string;
  type: 'basketball' | 'badminton' | 'tennis' | 'volleyball' | 'cricket' | 'football';
  location: string;
  capacity: number;
  pricePerHour: number;
  image: string;
  rating: number;
  features: string[];
  availability: {
    date: string;
    slots: { time: string; available: boolean }[];
  }[];
}

const CourtsPage: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [filteredCourts, setFilteredCourts] = useState<Court[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  
  const location = useLocation();

  useEffect(() => {
    // Get sport from URL params
    const urlParams = new URLSearchParams(location.search);
    const sportParam = urlParams.get('sport');
    if (sportParam) {
      setSelectedType(sportParam);
    }
  }, [location]);

  useEffect(() => {
    // Mock data with MLRIT-specific courts
    const mockCourts: Court[] = [
      {
        id: '1',
        name: 'Main Basketball Court',
        type: 'basketball',
        location: 'Sports Complex A',
        capacity: 10,
        pricePerHour: 200,
        rating: 4.8,
        features: ['Professional Flooring', 'LED Lighting', 'Scoreboard'],
        image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
        availability: [
          {
            date: new Date().toISOString().split('T')[0],
            slots: [
              { time: '06:00', available: true },
              { time: '07:00', available: true },
              { time: '08:00', available: false },
              { time: '09:00', available: true },
              { time: '10:00', available: true },
              { time: '17:00', available: true },
              { time: '18:00', available: false },
              { time: '19:00', available: true },
            ],
          },
        ],
      },
      {
        id: '2',
        name: 'Indoor Badminton Court 1',
        type: 'badminton',
        location: 'Sports Complex B',
        capacity: 4,
        pricePerHour: 150,
        rating: 4.9,
        features: ['Wooden Flooring', 'Air Conditioning', 'Professional Nets'],
        image: 'https://images.pexels.com/photos/8007401/pexels-photo-8007401.jpeg?auto=compress&cs=tinysrgb&w=800',
        availability: [
          {
            date: new Date().toISOString().split('T')[0],
            slots: [
              { time: '06:00', available: true },
              { time: '07:00', available: false },
              { time: '08:00', available: true },
              { time: '09:00', available: true },
              { time: '10:00', available: false },
              { time: '17:00', available: true },
              { time: '18:00', available: true },
              { time: '19:00', available: true },
            ],
          },
        ],
      },
      {
        id: '3',
        name: 'Indoor Badminton Court 2',
        type: 'badminton',
        location: 'Sports Complex B',
        capacity: 4,
        pricePerHour: 150,
        rating: 4.7,
        features: ['Wooden Flooring', 'Air Conditioning', 'Professional Nets'],
        image: 'https://images.pexels.com/photos/8007401/pexels-photo-8007401.jpeg?auto=compress&cs=tinysrgb&w=800',
        availability: [
          {
            date: new Date().toISOString().split('T')[0],
            slots: [
              { time: '06:00', available: false },
              { time: '07:00', available: true },
              { time: '08:00', available: true },
              { time: '09:00', available: false },
              { time: '10:00', available: true },
              { time: '17:00', available: false },
              { time: '18:00', available: true },
              { time: '19:00', available: true },
            ],
          },
        ],
      },
      {
        id: '4',
        name: 'Outdoor Tennis Court',
        type: 'tennis',
        location: 'Outdoor Sports Complex',
        capacity: 4,
        pricePerHour: 250,
        rating: 4.6,
        features: ['Synthetic Surface', 'Floodlights', 'Professional Nets'],
        image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
        availability: [
          {
            date: new Date().toISOString().split('T')[0],
            slots: [
              { time: '06:00', available: true },
              { time: '07:00', available: true },
              { time: '08:00', available: true },
              { time: '09:00', available: false },
              { time: '10:00', available: true },
              { time: '17:00', available: true },
              { time: '18:00', available: true },
              { time: '19:00', available: false },
            ],
          },
        ],
      },
      {
        id: '5',
        name: 'Volleyball Court',
        type: 'volleyball',
        location: 'Indoor Sports Hall',
        capacity: 12,
        pricePerHour: 180,
        rating: 4.5,
        features: ['Professional Net', 'Wooden Flooring', 'Spectator Seating'],
        image: 'https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg?auto=compress&cs=tinysrgb&w=800',
        availability: [
          {
            date: new Date().toISOString().split('T')[0],
            slots: [
              { time: '06:00', available: true },
              { time: '07:00', available: true },
              { time: '08:00', available: false },
              { time: '09:00', available: true },
              { time: '10:00', available: true },
              { time: '17:00', available: false },
              { time: '18:00', available: true },
              { time: '19:00', available: true },
            ],
          },
        ],
      },
      {
        id: '6',
        name: 'Football Ground',
        type: 'football',
        location: 'Main Sports Ground',
        capacity: 22,
        pricePerHour: 300,
        rating: 4.7,
        features: ['Natural Grass', 'Floodlights', 'Goal Posts'],
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
        availability: [
          {
            date: new Date().toISOString().split('T')[0],
            slots: [
              { time: '06:00', available: true },
              { time: '07:00', available: false },
              { time: '08:00', available: true },
              { time: '09:00', available: true },
              { time: '10:00', available: false },
              { time: '17:00', available: true },
              { time: '18:00', available: true },
              { time: '19:00', available: false },
            ],
          },
        ],
      },
    ];

    setCourts(mockCourts);
    setFilteredCourts(mockCourts);
  }, []);

  useEffect(() => {
    let filtered = courts;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(court => court.type === selectedType);
    }

    setFilteredCourts(filtered);
  }, [courts, selectedType]);

  const getAvailableSlots = (court: Court) => {
    const todayAvailability = court.availability.find(
      av => av.date === selectedDate
    );
    return todayAvailability?.slots.filter(slot => slot.available).length || 0;
  };

  const courtTypes = [
    { value: 'all', label: 'All Sports' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'badminton', label: 'Badminton' },
    { value: 'tennis', label: 'Tennis' },
    { value: 'volleyball', label: 'Volleyball' },
    { value: 'football', label: 'Football' },
    { value: 'cricket', label: 'Cricket' },
  ];

  const getSportIcon = (type: string) => {
    const icons: Record<string, string> = {
      basketball: '🏀',
      badminton: '🏸',
      tennis: '🎾',
      volleyball: '🏐',
      football: '⚽',
      cricket: '🏏',
    };
    return icons[type] || '🏟️';
  };

  return (
    <div className="min-h-screen bg-gray-25 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            Available Courts
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            Find and book the perfect court for your sports activities at MLRIT.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 animate-slide-up">
          <Card className="p-6 border-0 shadow-medium">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full h-12 px-4 pl-12 border-0 bg-gray-50 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors appearance-none"
                >
                  {courtTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <Filter className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
              </div>

              <div className="relative">
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="pl-12 h-12 border-0 bg-gray-50 focus:bg-white transition-colors"
                />
                <Calendar className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
              </div>

              <Button className="h-12 shadow-medium hover:shadow-large">
                Apply Filters
              </Button>
            </div>
          </Card>
        </div>

        {/* Courts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourts.map((court, index) => (
            <Card
              key={court.id}
              className="overflow-hidden group cursor-pointer hover:shadow-large transition-all duration-300 hover:-translate-y-2 border-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={court.image}
                  alt={court.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className="text-2xl">{getSportIcon(court.type)}</span>
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 capitalize">
                    {court.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-700">{court.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {court.name}
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                    {court.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-primary-500" />
                    Up to {court.capacity} players
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-primary-500" />
                    {getAvailableSlots(court)} slots available today
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {court.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                  {court.features.length > 2 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium">
                      +{court.features.length - 2} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">₹{court.pricePerHour}</span>
                    <span className="text-sm text-gray-500">/hour</span>
                  </div>
                  <Link to={`/book/${court.id}`}>
                    <Button
                      size="sm"
                      className="group-hover:shadow-large transition-all duration-200 px-6"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCourts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No courts found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your filters to find available courts.</p>
            <Button onClick={() => setSelectedType('all')}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourtsPage;