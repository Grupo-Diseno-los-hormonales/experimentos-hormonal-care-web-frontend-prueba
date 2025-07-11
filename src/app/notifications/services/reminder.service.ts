import { Injectable } from '@angular/core';
import { Reminder } from '../model/reminder.model';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private reminders: Reminder[] = [
    {
      id: '1',
      title: 'Nueva Cita Médica',
      message: 'Se te ha asignado una nueva cita el 10 de julio de 2025, 6:00 p.m. con el Dr. Pérez.',
      date: '2025-07-10T18:00:00Z',
      read: false
    },
    {
      id: '2',
      title: 'Toma de medicamento',
      message: 'Recuerda tomar tu medicamento para la presión a las 8:00 a.m.',
      date: '2025-07-10T08:00:00Z',
      read: false
    }
  ];

  getTodaysReminders(): Reminder[] {
    const today = new Date().toISOString().slice(0, 10);
    return this.reminders.filter(r => r.date.startsWith(today));
  }

  markAsRead(id: string) {
    const reminder = this.reminders.find(r => r.id === id);
    if (reminder) reminder.read = true;
  }

  getUnreadCount(): number {
    return this.getTodaysReminders().filter(r => !r.read).length;
  }
}
