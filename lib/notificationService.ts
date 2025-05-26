import dbConnect from '@/lib/mongodb';
import Notification from '@/models/Notification';

export interface CreateNotificationData {
  type: 'booking_created' | 'booking_updated' | 'booking_cancelled' | 'system';
  title: string;
  message: string;
  bookingId?: string;
  priority?: 'low' | 'medium' | 'high';
}

export class NotificationService {
  static async createNotification(data: CreateNotificationData) {
    try {
      await dbConnect();
      
      const notification = await Notification.create({
        type: data.type,
        title: data.title,
        message: data.message,
        bookingId: data.bookingId,
        priority: data.priority || 'medium'
      });

      return notification;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  static async getNotifications(limit = 50, unreadOnly = false) {
    try {
      await dbConnect();
      
      const filter = unreadOnly ? { isRead: false } : {};
      
      const notifications = await Notification.find(filter)
        .populate('bookingId')
        .sort({ createdAt: -1 })
        .limit(limit);

      return notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  static async markAsRead(notificationId: string) {
    try {
      await dbConnect();
      
      const notification = await Notification.findByIdAndUpdate(
        notificationId,
        { 
          isRead: true,
          readAt: new Date()
        },
        { new: true }
      );

      return notification;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  static async markAllAsRead() {
    try {
      await dbConnect();
      
      await Notification.updateMany(
        { isRead: false },
        { 
          isRead: true,
          readAt: new Date()
        }
      );

      return true;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  static async getUnreadCount() {
    try {
      await dbConnect();
      
      const count = await Notification.countDocuments({ isRead: false });
      return count;
    } catch (error) {
      console.error('Error getting unread count:', error);
      throw error;
    }
  }

  static async deleteNotification(notificationId: string) {
    try {
      await dbConnect();
      
      const notification = await Notification.findByIdAndDelete(notificationId);
      return notification;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }

  // Helper methods for specific notification types
  static async createBookingNotification(type: 'booking_created' | 'booking_updated' | 'booking_cancelled', booking: any) {
    const titles = {
      booking_created: 'New Booking Created',
      booking_updated: 'Booking Updated',
      booking_cancelled: 'Booking Cancelled'
    };

    const messages = {
      booking_created: `New booking for ${booking.customerName} - Room ${booking.roomNumber}`,
      booking_updated: `Booking for ${booking.customerName} has been updated`,
      booking_cancelled: `Booking for ${booking.customerName} has been cancelled`
    };

    return this.createNotification({
      type,
      title: titles[type],
      message: messages[type],
      bookingId: booking._id,
      priority: type === 'booking_created' ? 'high' : 'medium'
    });
  }
}