export enum UserRole {
  GUEST = 'GUEST',
  USER = 'USER',
  VOLUNTEER = 'VOLUNTEER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  username: string;
  email: string;
  location: string;
  role: UserRole;
  balance: number; // Total amount contributed
}

export interface Transaction {
  id: string;
  userId: string;
  date: string; // ISO string or formatted date
  amount: number;
  type: 'Chat' | 'Call' | 'Donation';
  description: string;
  method: 'Card' | 'PayPal';
}

export interface Volunteer {
  id: string;
  alias: string; // Cartoon name
  avatarUrl: string; // Cartoon image
  status: 'available' | 'busy' | 'offline';
  bio: string;
}

export interface ConversationSession {
  id: string;
  type: 'chat' | 'call';
  date: string;
  durationMinutes: number;
  cost: number;
  volunteerId: string;
  volunteerAlias: string;
  status: 'completed' | 'scheduled' | 'cancelled';
}

export interface TimeSlot {
  id: string;
  time: string;
  date: string;
  available: boolean;
}

export interface EmailNotification {
  id: string;
  to: string;
  subject: string;
  body: string;
  sentAt: Date;
  type: 'welcome' | 'confirmation' | 'reminder';
}