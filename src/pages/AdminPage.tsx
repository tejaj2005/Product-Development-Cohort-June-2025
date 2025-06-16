import React, { useState, useEffect } from 'react';
import { Calendar, Users, DollarSign, TrendingUp, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  activeUsers: number;
  courtUtilization: number;
}

interface Court {
  id: string;
  name: string;
  type: string;
  location: string;
  capacity: number;
  pricePerHour: number;
  status: 'active' | 'maintenance' | 'inactive';
}

interface Booking {
  id: string;
  courtName: string;
  userName: string;
  userType: string;
  date: string;
  timeSlots: string[];
  totalAmount: number;
  status: string;
}

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'courts' | 'bookings'>('dashboard');
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    totalRevenue: 0,
    activeUsers: 0,
    courtUtilization: 0,
  });
  const [courts, setCourts] = useState<Court[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showAddCourt, setShowAddCourt] = useState(false);
  const [newCourt, setNewCourt] = useState({
    name: '',
    type: 'basketball',
    location: '',
    capacity: 10,
    pricePerHour: 200,
  });

  useEffect(() => {
    if (!user || user.userType !== 'admin') {
      navigate('/');
      return;
    }

    // Mock data
    setStats({
      totalBookings: 156,
      totalRevenue: 45600,
      activeUsers: 89,
      courtUtilization: 78,
    });

    setCourts([
      {
        id: '1',
        name: 'Main Basketball Court',
        type: 'Basketball',
        location: 'Sports Complex A',
        capacity: 10,
        pricePerHour: 200,
        status: 'active',
      },
      {
        id: '2',
        name: 'Badminton Court 1',
        type: 'Badminton',
        location: 'Sports Complex B',
        capacity: 4,
        pricePerHour: 150,
        status: 'active',
      },
      {
        id: '3',
        name: 'Tennis Court',
        type: 'Tennis',
        location: 'Outdoor Complex',
        capacity: 4,
        pricePerHour: 250,
        status: 'maintenance',
      },
    ]);

    setBookings([
      {
        id: '1',
        courtName: 'Main Basketball Court',
        userName: 'John Doe',
        userType: 'student',
        date: '2024-01-15',
        timeSlots: ['18:00', '19:00'],
        totalAmount: 400,
        status: 'confirmed',
      },
      {
        id: '2',
        courtName: 'Badminton Court 1',
        userName: 'Jane Smith',
        userType: 'staff',
        date: '2024-01-16',
        timeSlots: ['07:00'],
        totalAmount: 150,
        status: 'confirmed',
      },
    ]);
  }, [user, navigate]);

  const handleAddCourt = () => {
    const court: Court = {
      id: Date.now().toString(),
      ...newCourt,
      type: newCourt.type.charAt(0).toUpperCase() + newCourt.type.slice(1),
      status: 'active',
    };
    
    setCourts(prev => [...prev, court]);
    setNewCourt({
      name: '',
      type: 'basketball',
      location: '',
      capacity: 10,
      pricePerHour: 200,
    });
    setShowAddCourt(false);
  };

  const courtTypeOptions = [
    { value: 'basketball', label: 'Basketball' },
    { value: 'badminton', label: 'Badminton' },
    { value: 'tennis', label: 'Tennis' },
    { value: 'volleyball', label: 'Volleyball' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user || user.userType !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-25 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage courts, bookings, and monitor system performance.</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 animate-slide-up">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                { id: 'courts', label: 'Courts', icon: Calendar },
                { id: 'bookings', label: 'Bookings', icon: Users },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Total Bookings',
                  value: stats.totalBookings,
                  icon: Calendar,
                  color: 'text-blue-600',
                  bgColor: 'bg-blue-100',
                },
                {
                  title: 'Total Revenue',
                  value: `₹${stats.totalRevenue.toLocaleString()}`,
                  icon: DollarSign,
                  color: 'text-green-600',
                  bgColor: 'bg-green-100',
                },
                {
                  title: 'Active Users',
                  value: stats.activeUsers,
                  icon: Users,
                  color: 'text-purple-600',
                  bgColor: 'bg-purple-100',
                },
                {
                  title: 'Court Utilization',
                  value: `${stats.courtUtilization}%`,
                  icon: TrendingUp,
                  color: 'text-orange-600',
                  bgColor: 'bg-orange-100',
                },
              ].map((stat, index) => (
                <Card key={stat.title} className="p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="p-6 animate-slide-up">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
              <div className="space-y-4">
                {bookings.slice(0, 5).map((booking, index) => (
                  <div key={booking.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{booking.courtName}</p>
                      <p className="text-sm text-gray-600">
                        {booking.userName} ({booking.userType}) • {booking.date} • {booking.timeSlots.join(', ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{booking.totalAmount}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Courts Tab */}
        {activeTab === 'courts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Manage Courts</h2>
              <Button onClick={() => setShowAddCourt(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Court
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courts.map((court, index) => (
                <Card key={court.id} className="p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{court.name}</h3>
                      <p className="text-sm text-gray-600">{court.location}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(court.status)}`}>
                      {court.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <span className="ml-2 font-medium">{court.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Capacity:</span>
                      <span className="ml-2 font-medium">{court.capacity} players</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Rate:</span>
                      <span className="ml-2 font-medium">₹{court.pricePerHour}/hour</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Add Court Modal */}
            {showAddCourt && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <Card className="max-w-md w-full p-6 animate-slide-up">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Court</h3>
                  
                  <div className="space-y-4">
                    <Input
                      label="Court Name"
                      value={newCourt.name}
                      onChange={(e) => setNewCourt(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Basketball Court 2"
                    />
                    
                    <Select
                      label="Court Type"
                      value={newCourt.type}
                      onChange={(e) => setNewCourt(prev => ({ ...prev, type: e.target.value }))}
                      options={courtTypeOptions}
                    />
                    
                    <Input
                      label="Location"
                      value={newCourt.location}
                      onChange={(e) => setNewCourt(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., Sports Complex C"
                    />
                    
                    <Input
                      label="Capacity"
                      type="number"
                      value={newCourt.capacity}
                      onChange={(e) => setNewCourt(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                      min="1"
                    />
                    
                    <Input
                      label="Price per Hour (₹)"
                      type="number"
                      value={newCourt.pricePerHour}
                      onChange={(e) => setNewCourt(prev => ({ ...prev, pricePerHour: parseInt(e.target.value) }))}
                      min="0"
                    />
                  </div>
                  
                  <div className="flex space-x-3 justify-end mt-6">
                    <Button variant="outline" onClick={() => setShowAddCourt(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddCourt}>
                      Add Court
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">All Bookings</h2>
            
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Court & User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{booking.courtName}</div>
                            <div className="text-sm text-gray-500">{booking.userName} ({booking.userType})</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.date}</div>
                          <div className="text-sm text-gray-500">{booking.timeSlots.join(', ')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{booking.totalAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;