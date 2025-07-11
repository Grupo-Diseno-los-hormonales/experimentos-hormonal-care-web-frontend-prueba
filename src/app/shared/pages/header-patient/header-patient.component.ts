import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterModule} from '@angular/router';
import { UserTypeService } from '../../services/user-type.service';
import { UserType } from '../../model/user-type.model';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {CommonModule} from "@angular/common";
import {ColleagueSearchComponent} from "../../../communications/pages/colleague-search/colleague-search.component";
import {AuthenticationService} from "../../../iam/services/authentication.service";
import {ReminderService} from "../../../notifications/services/reminder.service";

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
export class HeaderPatientComponent implements OnInit{
  unreadCount = 0;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private reminderService: ReminderService,
  ) {}
  optionsPatients = [
    { path: '/homePatient', title: 'Home', icon: 'assets/images/home-icon.png'},
    { path: '/calendarPatientView', title: 'Calendar', icon: 'assets/images/calendar.png'},
    { path: '/messagesPatient', title: 'Messages', icon: 'assets/images/message.png'},
    { path: '/notificationsPatient', title: 'Notifications', icon: 'assets/images/bell.png'},
    { path: '/patientProfile', title: 'Profile', icon: 'assets/images/profile-icon.png'},
  ]
  ngOnInit(): void {
    this.updateCount();
  }

  updateCount(): void {
    this.unreadCount = this.reminderService.getUnreadCount();
  }
  navigateToDoctors() {
    this.router.navigate(['/available-doctors']);
  }
  logout(): void {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
