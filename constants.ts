import { Volunteer, TimeSlot } from './types';

export const APP_NAME = "Our Ears Are Open";
export const PRICE_PER_SESSION = 2.99;
export const SESSION_DURATION_MINUTES = 15;

// Using high-quality 3D cartoon animal avatars to match the requested style
export const VOLUNTEERS: Volunteer[] = [
  {
    id: 'v1',
    alias: 'Oliver',
    avatarUrl: 'https://cdn-icons-png.flaticon.com/512/4080/4080036.png', // Bunny
    status: 'available',
    bio: 'A gentle soul who loves listening to your stories. Always here for a hop-ful chat.'
  },
  {
    id: 'v2',
    alias: 'Sophia',
    avatarUrl: 'https://cdn-icons-png.flaticon.com/512/4080/4080131.png', // Panda
    status: 'busy',
    bio: 'Calm, patient, and understanding. Finding balance in black and white.'
  },
  {
    id: 'v3',
    alias: 'Leo',
    avatarUrl: 'https://cdn-icons-png.flaticon.com/512/4080/4080077.png', // Cat
    status: 'available',
    bio: 'Curious and caring. I promise to keep your secrets purr-fectly safe.'
  },
  {
    id: 'v4',
    alias: 'Bella',
    avatarUrl: 'https://cdn-icons-png.flaticon.com/512/4080/4080061.png', // Dog
    status: 'offline',
    bio: 'Loyal and friendly. I am here to be your best friend when you need one.'
  }
];

export const MOCK_SLOTS: TimeSlot[] = [
  { id: 't1', time: '10:00 AM', date: 'Today', available: true },
  { id: 't2', time: '10:15 AM', date: 'Today', available: false },
  { id: 't3', time: '10:30 AM', date: 'Today', available: true },
  { id: 't4', time: '11:00 AM', date: 'Today', available: true },
  { id: 't5', time: '02:00 PM', date: 'Tomorrow', available: true },
];

export const SUICIDE_PREVENTION_NUMBER = "988";
export const EMERGENCY_TEXT = "If you are in immediate danger, please call 911.";