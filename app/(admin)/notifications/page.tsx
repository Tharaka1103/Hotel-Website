'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Check, CheckCheck, Trash2, Filter, Search, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout';

interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  bookingId?: {
    _id: string;
    customerName: string;
    roomNumber: number;
  };
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/notifications?limit=100');
      const data = await response.json();
      
      let filteredNotifications = data.notifications || [];
      
      // Apply filters
      if (filter === 'unread') {
        filteredNotifications = filteredNotifications.filter((n: Notification) => !n.isRead);
      } else if (filter === 'read') {
        filteredNotifications = filteredNotifications.filter((n: Notification) => n.isRead);
      }
      
      if (typeFilter !== 'all') {
        filteredNotifications = filteredNotifications.filter((n: Notification) => n.type === typeFilter);
      }
      
      if (searchTerm) {
        filteredNotifications = filteredNotifications.filter((n: Notification) =>
          n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.message.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      setNotifications(filteredNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const refreshNotifications = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
    toast.success('Notifications refreshed');
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch(`/api/notifications?action=markRead&id=${notificationId}`, {
        method: 'PUT',
      });
      
      setNotifications(prev =>
        prev.map(notif =>
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
      
      toast.success('Notification marked as read');
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error('Failed to mark notification as read');
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch('/api/notifications?action=markAllRead', {
        method: 'PUT',
      });
      
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, isRead: true }))
      );
      
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast.error('Failed to mark all notifications as read');
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      await fetch(`/api/notifications?id=${notificationId}`, {
        method: 'DELETE',
      });
      
      setNotifications(prev =>
        prev.filter(notif => notif._id !== notificationId)
      );
      
      toast.success('Notification deleted');
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast.error('Failed to delete notification');
    }
  };

  const deleteAllRead = async () => {
    try {
      const readNotifications = notifications.filter(n => n.isRead);
      
      await Promise.all(
        readNotifications.map(notification =>
          fetch(`/api/notifications?id=${notification._id}`, { method: 'DELETE' })
        )
      );
      
      setNotifications(prev => prev.filter(notif => !notif.isRead));
      toast.success(`Deleted ${readNotifications.length} read notifications`);
    } catch (error) {
      console.error('Error deleting read notifications:', error);
      toast.error('Failed to delete read notifications');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'booking_created': return '🏨';
      case 'booking_updated': return '✏️';
      case 'booking_cancelled': return '❌';
      case 'system': return '⚙️';
      default: return '📢';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const readCount = notifications.filter(n => n.isRead).length;

  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Page Header */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center">
              <Bell className="mr-2 sm:mr-3 h-6 w-6 sm:h-8 sm:w-8" />
              <span className="truncate">Notifications</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage your admin notifications and stay updated with system events
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2">
            <Button
              onClick={refreshNotifications}
              disabled={refreshing}
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
            >
              <RefreshCw className={cn("h-4 w-4 mr-2", refreshing && "animate-spin")} />
              Refresh
            </Button>
            
            {unreadCount > 0 && (
              <Button
                onClick={markAllAsRead}
                variant="default"
                size="sm"
                className="w-full sm:w-auto"
              >
                <CheckCheck className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Mark All Read</span>
                <span className="sm:hidden">Mark All</span>
              </Button>
            )}
            
            {readCount > 0 && (
              <Button
                onClick={deleteAllRead}
                variant="destructive"
                size="sm"
                className="w-full sm:w-auto"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Delete Read</span>
                <span className="sm:hidden">Delete</span>
              </Button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Total Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{notifications.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Unread</CardTitle>
              <Badge variant="destructive" className="h-5 w-5 sm:h-6 sm:w-6 rounded-full p-0 flex items-center justify-center text-xs">
                {unreadCount}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-red-600">{unreadCount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Read</CardTitle>
              <Badge variant="secondary" className="h-5 w-5 sm:h-6 sm:w-6 rounded-full p-0 flex items-center justify-center text-xs">
                {readCount}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-green-600">{readCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base sm:text-lg">Filters</CardTitle>
            <CardDescription className="text-sm">Filter notifications by status, type, or search terms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* First Row - Status and Type Filters */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex items-center space-x-2 min-w-0">
                  <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <Select value={filter} onValueChange={(value: 'all' | 'unread' | 'read') => setFilter(value)}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="unread">Unread</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="booking_created">New Bookings</SelectItem>
                    <SelectItem value="booking_updated">Booking Updates</SelectItem>
                    <SelectItem value="booking_cancelled">Cancellations</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Second Row - Search and Apply Button */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                </div>

                <Button 
                  onClick={fetchNotifications} 
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base sm:text-lg">Notifications</CardTitle>
            <CardDescription className="text-sm">
              {loading ? 'Loading notifications...' : `Showing ${notifications.length} notifications`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6 sm:p-8 text-center text-muted-foreground">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-sm sm:text-base">Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-6 sm:p-8 text-center text-muted-foreground">
                <Bell className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
                <p className="text-base sm:text-lg font-medium mb-2">No notifications found</p>
                <p className="text-sm">Try adjusting your filters or check back later</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.map((notification, index) => (
                  <div
                    key={notification._id}
                    className={cn(
                      "p-4 sm:p-6 hover:bg-muted/50 transition-colors",
                      !notification.isRead && "bg-card border-l-4 border-l-blue-500"
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1 min-w-0 space-y-3">
                        {/* Header with icon, title, and badges */}
                        <div className="flex flex-wrap items-start gap-2 sm:gap-3">
                          <span className="text-xl sm:text-2xl flex-shrink-0">{getTypeIcon(notification.type)}</span>
                          <div className="flex-1 min-w-0">
                            <h3 className={cn(
                              "text-base sm:text-lg font-medium break-words",
                              !notification.isRead ? "text-foreground" : "text-muted-foreground"
                            )}>
                              {notification.title}
                            </h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge 
                              variant="outline" 
                              className={cn("text-xs font-medium", getPriorityColor(notification.priority))}
                            >
                              {notification.priority.toUpperCase()}
                            </Badge>
                            {!notification.isRead && (
                              <Badge variant="default" className="text-xs">
                                NEW
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {/* Message */}
                        <p className={cn(
                          "text-sm break-words",
                          !notification.isRead ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {notification.message}
                        </p>
                        
                        {/* Booking Details */}
                        {notification.bookingId && (
                          <div className="bg-muted p-3 rounded-md">
                            <p className="text-sm font-medium text-foreground mb-1">
                              Booking Details:
                            </p>
                            <div className="text-sm text-muted-foreground space-y-1 sm:space-y-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <span>Customer: <span className="font-medium">{notification.bookingId.customerName}</span></span>
                                <span className="hidden sm:inline">|</span>
                                <span>Room: <span className="font-medium">{notification.bookingId.roomNumber}</span></span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Timestamp */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-muted-foreground">
                          <span>{formatTimeAgo(notification.createdAt)}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="break-all sm:break-normal">{formatDate(notification.createdAt)}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-row sm:flex-col gap-2 sm:ml-4 flex-shrink-0">
                        {!notification.isRead && (
                          <Button
                            onClick={() => markAsRead(notification._id)}
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 flex-shrink-0"
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          onClick={() => deleteNotification(notification._id)}
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                          title="Delete notification"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default NotificationsPage;
