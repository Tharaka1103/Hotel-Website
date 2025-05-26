import { NextResponse } from 'next/server';
import { NotificationService } from '@/lib/notificationService';

export async function GET() {
  try {
    const count = await NotificationService.getUnreadCount();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching notification count:', error);
    return NextResponse.json({ error: 'Failed to fetch notification count' }, { status: 500 });
  }
}