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
    try {
      const titles = {
        booking_created: 'New Booking Created',
        booking_updated: 'Booking Updated',
        booking_cancelled: 'Booking Cancelled'
      };

      // Create accommodation details string
      const getAccommodationDetails = (booking: any) => {
        if (booking.roomType === 'room') {
          const roomCount = booking.roomNumbers?.length || 0;
          const roomList = booking.roomNumbers?.join(', ') || '';
          return roomCount > 1 
            ? `Rooms ${roomList} (${roomCount * 2} beds total)`
            : `Room ${roomList} (2 beds)`;
        } else if (booking.roomType === 'dorm') {
          const bedCount = booking.bedNumbers?.length || 0;
          const bedList = booking.bedNumbers?.join(', ') || '';
          return bedCount > 1
            ? `Dorm - Beds ${bedList} (${bedCount} beds)`
            : `Dorm - Bed ${bedList}`;
        } else if (booking.roomType === 'single') {
          const roomCount = booking.roomNumbers?.length || 0;
          const roomList = booking.roomNumbers?.join(', ') || '';
          return roomCount > 1 
            ? `Single Rooms ${roomList} (${roomCount} beds total)`
            : `Single Room ${roomList} (1 bed)`;
        } else if (booking.roomType === 'family') {
          const roomCount = booking.roomNumbers?.length || 0;
          const roomList = booking.roomNumbers?.join(', ') || '';
          return roomCount > 1 
            ? `Family Rooms ${roomList} (${roomCount * 4} beds total)`
            : `Family Room ${roomList} (4 beds)`;
        }
        return 'Unknown accommodation';
      };

      const accommodationDetails = getAccommodationDetails(booking);

      const messages = {
        booking_created: `New booking for ${booking.customerName} - ${accommodationDetails} | Check-in: ${new Date(booking.checkInDate).toLocaleDateString()} | Total: $${booking.totalPrice}`,
        booking_updated: `Booking for ${booking.customerName} has been updated - ${accommodationDetails} | Status: ${booking.status}`,
        booking_cancelled: `Booking for ${booking.customerName} has been cancelled - ${accommodationDetails} | Was scheduled for: ${new Date(booking.checkInDate).toLocaleDateString()}`
      };

      return this.createNotification({
        type,
        title: titles[type],
        message: messages[type],
        bookingId: booking._id,
        priority: type === 'booking_created' ? 'high' : 'medium'
      });
    } catch (error) {
      console.error('Error creating booking notification:', error);
      throw error;
    }
  }

  // Helper method for system notifications
  static async createSystemNotification(title: string, message: string, priority: 'low' | 'medium' | 'high' = 'medium') {
    try {
      return this.createNotification({
        type: 'system',
        title,
        message,
        priority
      });
    } catch (error) {
      console.error('Error creating system notification:', error);
      throw error;
    }
  }

  // Helper method to create notifications for booking reminders
  static async createBookingReminder(booking: any, reminderType: 'checkin_tomorrow' | 'checkout_today' | 'overdue') {
    try {
      const titles = {
        checkin_tomorrow: 'Check-in Reminder',
        checkout_today: 'Check-out Reminder',
        overdue: 'Overdue Booking'
      };

      const messages = {
        checkin_tomorrow: `${booking.customerName} is checking in tomorrow - ${booking.roomType === 'room' ? `Room${booking.roomNumbers?.length > 1 ? 's' : ''} ${booking.roomNumbers?.join(', ')}` : `Dome - Bed${booking.bedNumbers?.length > 1 ? 's' : ''} ${booking.bedNumbers?.join(', ')}`}`,
        checkout_today: `${booking.customerName} is checking out today - ${booking.roomType === 'room' ? `Room${booking.roomNumbers?.length > 1 ? 's' : ''} ${booking.roomNumbers?.join(', ')}` : `Dome - Bed${booking.bedNumbers?.length > 1 ? 's' : ''} ${booking.bedNumbers?.join(', ')}`}`,
        overdue: `${booking.customerName}'s booking is overdue - ${booking.roomType === 'room' ? `Room${booking.roomNumbers?.length > 1 ? 's' : ''} ${booking.roomNumbers?.join(', ')}` : `Dome - Bed${booking.bedNumbers?.length > 1 ? 's' : ''} ${booking.bedNumbers?.join(', ')}`}`
      };

      return this.createNotification({
        type: 'system',
        title: titles[reminderType],
        message: messages[reminderType],
        bookingId: booking._id,
        priority: reminderType === 'overdue' ? 'high' : 'medium'
      });
    } catch (error) {
      console.error('Error creating booking reminder:', error);
      throw error;
    }
  }

  // Bulk operations
  static async deleteOldNotifications(daysOld = 30) {
    try {
      await dbConnect();
      
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      const result = await Notification.deleteMany({
        createdAt: { $lt: cutoffDate },
        isRead: true
      });

      return result.deletedCount;
    } catch (error) {
      console.error('Error deleting old notifications:', error);
      throw error;
    }
  }

  // Get notifications for a specific booking
  static async getBookingNotifications(bookingId: string) {
    try {
      await dbConnect();
      
      const notifications = await Notification.find({ bookingId })
        .sort({ createdAt: -1 });

      return notifications;
    } catch (error) {
      console.error('Error fetching booking notifications:', error);
      throw error;
    }
  }
}
