export interface Reminder {
  id: string;
  title: string;
  message: string;
  date: string; // ISO format: '2025-07-10T14:00:00Z'
  read?: boolean;
}
