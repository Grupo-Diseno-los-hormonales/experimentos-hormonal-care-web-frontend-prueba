export interface SupportTicket {
  id: string;
  createdAt: string;
  userRole: 'doctor' | 'patient';
  userName: string;
  userEmail?: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  attachments?: string[];
  subjectKey?: string;
  messageKey?: string;
}
