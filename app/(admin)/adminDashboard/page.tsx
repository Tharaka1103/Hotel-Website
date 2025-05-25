'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Star,
  MapPin,
  Wifi,
  Car,
  Coffee,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import CreateAdminModal from '@/components/admin/CreateAdminModal';
import { Progress } from '@/components/ui/progress';

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: any;
  color: string;
}

export default function AdminDashboard() {
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCurrentAdmin();
    fetchAdmins();
  }, []);

  const fetchCurrentAdmin = async () => {
    try {
      const response = await fetch('/api/admin/me');
      const data = await response.json();
      if (data.success) {
        setCurrentAdmin(data.admin);
      } else {
        router.push('/adminLogin');
      }
    } catch (error) {
      console.error('Error fetching current admin:', error);
      router.push('/adminLogin');
    } finally {
      setLoading(false);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await fetch('/api/admin/list');
      const data = await response.json();
      if (data.success) {
        setAdmins(data.admins);
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleAdminCreated = () => {
    fetchAdmins();
    setShowCreateModal(false);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  const stats: StatCard[] = [
    {
      title: 'Total Revenue',
      value: '$124,590',
      change: '+12.5%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Active Bookings',
      value: '248',
      change: '+8.2%',
      changeType: 'increase',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Total Guests',
      value: '1,248',
      change: '+23.1%',
      changeType: 'increase',
      icon: Users,
      color: 'from-purple-500 to-violet-600'
    },
    {
      title: 'Occupancy Rate',
      value: '87%',
      change: '-2.4%',
      changeType: 'decrease',
      icon: Building2,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const recentBookings = [
    { id: 1, guest: 'John Smith', room: 'Ocean View Suite', checkIn: '2024-01-15', status: 'confirmed', amount: '$299' },
    { id: 2, guest: 'Emma Wilson', room: 'Deluxe Room', checkIn: '2024-01-16', status: 'pending', amount: '$199' },
    { id: 3, guest: 'Michael Brown', room: 'Presidential Suite', checkIn: '2024-01-17', status: 'confirmed', amount: '$599' },
    { id: 4, guest: 'Sarah Davis', room: 'Standard Room', checkIn: '2024-01-18', status: 'confirmed', amount: '$149' },
  ];

  const quickActions = [
    { title: 'Add New Room', icon: Building2, color: 'bg-blue-500', href: '/rooms/new' },
    { title: 'View Reports', icon: TrendingUp, color: 'bg-green-500', href: '/reports' },
    { title: 'Manage Staff', icon: Users, color: 'bg-purple-500', href: '/staff' },
    { title: 'Hotel Settings', icon: Activity, color: 'bg-orange-500', href: '/settings' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">Admin Portal</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">System Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Last update: {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                View Reports
              </Button>
              <Button variant="outline" onClick={() => router.push('/')}>
                Visit Hotel Site
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {stat.title}
                    </p>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <div className="flex items-center space-x-1">
                      {stat.changeType === 'increase' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">Recent Bookings</CardTitle>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {booking.guest.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {booking.guest}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {booking.room} • Check-in: {booking.checkIn}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                          className="capitalize"
                        >
                          {booking.status}
                        </Badge>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {booking.amount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Hotel Overview */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => router.push(action.href)}
                    >
                      <div className={`p-2 rounded-lg ${action.color}`}>
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-medium text-center">
                        {action.title}
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hotel Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Hotel Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Occupancy Rate</span>
                    <span className="text-sm font-semibold">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Staff on Duty</span>
                    <span className="text-sm font-semibold">24/28</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-lg font-bold">4.8</span>
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Rating</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold mb-1">156</div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Reviews</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-3">Amenities Status</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Wifi className="w-4 h-4 text-green-500" />
                      <span className="text-xs">WiFi Online</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Car className="w-4 h-4 text-green-500" />
                      <span className="text-xs">Parking Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Coffee className="w-4 h-4 text-green-500" />
                      <span className="text-xs">Restaurant Open</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-green-500" />
                      <span className="text-xs">Concierge Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Chart will be implemented here</p>
                  <p className="text-sm text-gray-500 mt-2">Revenue analytics and trends</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Booking Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
                <div className="text-center">
                  <Calendar className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Chart will be implemented here</p>
                  <p className="text-sm text-gray-500 mt-2">Booking patterns and forecasts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Admin Modal */}
      {showCreateModal && (
        <CreateAdminModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onAdminCreated={handleAdminCreated}
        />
      )}
    </AdminLayout>
  );
}
