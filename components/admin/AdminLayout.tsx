'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { Toaster } from 'sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NotificationContextType {
  unreadCount: number;
  refreshNotifications: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  notifications: Notification[];
  fetchNotifications: () => void;
}

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

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch('/api/notifications/count');
      const data = await response.json();
      setUnreadCount(data.count);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications?limit=20');
      const data = await response.json();
      setNotifications(data.notifications || []);
      
      // Update unread count based on fetched notifications
      const unreadCount = data.notifications?.filter((n: Notification) => !n.isRead).length || 0;
      setUnreadCount(unreadCount);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const refreshNotifications = () => {
    fetchUnreadCount();
    fetchNotifications();
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/notifications?action=markRead&id=${id}`, {
        method: 'PUT',
      });
      
      setNotifications(prev =>
        prev.map(notif =>
          notif._id === id ? { ...notif, isRead: true } : notif
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
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
      
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    fetchNotifications();
    
    // Set up polling for real-time updates
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 30000); // Poll every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{
      unreadCount,
      refreshNotifications,
      markAsRead,
      markAllAsRead,
      notifications,
      fetchNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <NotificationProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 pt-16 lg:pt-20">
          <div className="container mx-auto px-4 py-6 lg:py-8">
            {children}
          </div>
        </main>

        <AdminFooter />
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 4000,
            style: {
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />
      </div>
    </NotificationProvider>
  );
}
