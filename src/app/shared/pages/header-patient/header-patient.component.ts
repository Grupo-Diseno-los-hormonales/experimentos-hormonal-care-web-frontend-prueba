import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { ReminderService } from '../../../notifications/services/reminder.service';

@Component({
  selector: 'app-header-patient',
  templateUrl: './header-patient.component.html',
  styleUrls: ['./header-patient.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    MatToolbar,
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
  ]
})
export class HeaderPatientComponent implements OnInit {
  unreadCount = 0;
  showLogoutModal = false; // <--- AGREGA ESTA VARIABLE

  optionsPatients = [
    { path: '/homePatient', title: 'Home', icon: 'assets/images/home-icon.png' },
    { path: '/calendarPatientView', title: 'Calendar', icon: 'assets/images/calendar.png' },
    { path: '/messagesPatient', title: 'Messages', icon: 'assets/images/message.png' },
    { path: '/notificationsPatient', title: 'Notifications', icon: 'assets/images/bell.png' },
    { path: '/patientProfile', title: 'Profile', icon: 'assets/images/profile-icon.png' },
  ];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private reminderService: ReminderService,
  ) {}

  ngOnInit(): void {
    this.updateCount();
  }

  updateCount(): void {
    this.unreadCount = this.reminderService.getUnreadCount();
  }

  navigateToDoctors(): void {
    this.router.navigate(['/available-doctors']);
  }

  logout(): void {
    // Mostrar el modal personalizado
    this.showLogoutModal = true;
  }

  closeLogoutModal(confirm: boolean): void {
    this.showLogoutModal = false;
    if (confirm) {
      this.authService.signOut();
      this.router.navigate(['/login']);
    }
  }
}
