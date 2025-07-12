import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointments',
  standalone: true,
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
  imports: [CommonModule, MatButtonModule, FormsModule],
})
export class AppointmentsComponent {
  doctorId!: number;
  selectedDate: any = null;
  selectedMonth: string = 'April';
  currentYear: number = new Date().getFullYear();
  currentWeekStart!: Date;
  weekDates: Date[] = [];
  today: Date = new Date();

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  times: string[] = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.doctorId = +id;
    }
    this.initializeWeek();
  }

  initializeWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = (dayOfWeek + 6) % 7;

    const monday = new Date(today);
    monday.setDate(today.getDate() - diffToMonday);
    this.currentWeekStart = monday;

    this.generateWeekDates();
  }

  generateWeekDates() {
    this.weekDates = [];
    for (let i = 0; i < 5; i++) { // Only Monday to Friday
      const date = new Date(this.currentWeekStart);
      date.setDate(this.currentWeekStart.getDate() + i);
      this.weekDates.push(date);
    }
    this.syncMonthWithCurrentWeek();
  }

  previousWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.generateWeekDates();
  }

  nextWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.generateWeekDates();
  }

  syncMonthWithCurrentWeek() {
    const firstDay = this.weekDates[0];
    this.selectedMonth = this.months[firstDay.getMonth()];
    this.currentYear = firstDay.getFullYear();
  }

  updateCalendar() {
    const selectedMonthIndex = this.months.indexOf(this.selectedMonth);
    const today = new Date();
    const newDate = new Date(today.getFullYear(), selectedMonthIndex, 1);

    this.currentWeekStart = this.getMonday(newDate);
    this.generateWeekDates();
  }

  getMonday(d: Date): Date {
    const date = new Date(d);
    const day = date.getDay();
    const diff = (day <= 0 ? -6 : 1) - day;
    date.setDate(date.getDate() + diff);
    return date;
  }

  isPast(date: Date, time: string): boolean {
    const now = new Date();
    const [hourStr, minuteAmPm] = time.split(':');
    const [minutesStr, amPm] = minuteAmPm.split(' ');

    let hour = parseInt(hourStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (amPm === 'PM' && hour !== 12) {
      hour += 12;
    }
    if (amPm === 'AM' && hour === 12) {
      hour = 0;
    }

    const dateTime = new Date(date);
    dateTime.setHours(hour, minutes, 0, 0);

    return dateTime < now;
  }

  selectTime(time: string, date: Date) {
    if (this.isPast(date, time)) {
      alert('Cannot select a past date or time.');
      return;
    }

    this.selectedDate = {
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
      dayNumber: date.getDate(),
      monthName: date.toLocaleDateString('en-US', { month: 'long' }),
      year: date.getFullYear(),
      time: time
    };

    console.log(`Has seleccionado: ${this.selectedDate.dayName} ${this.selectedDate.dayNumber} ${this.selectedDate.monthName} ${this.selectedDate.year} a las ${time}`);
  }

  isSelected(date: Date, time: string): boolean {
    return this.selectedDate &&
      this.selectedDate.dayNumber === date.getDate() &&
      this.selectedDate.monthName === date.toLocaleDateString('en-US', { month: 'long' }) &&
      this.selectedDate.year === date.getFullYear() &&
      this.selectedDate.time === time;
  }

  confirmAppointment() {
    if (this.selectedDate) {
      this.router.navigate(['/homePatient'], {
        state: {
          dayName: this.selectedDate.dayName,
          dayNumber: this.selectedDate.dayNumber,
          monthName: this.selectedDate.monthName,
          year: this.selectedDate.year,
          time: this.selectedDate.time
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/doctor-profile', this.doctorId]);
  }
}
