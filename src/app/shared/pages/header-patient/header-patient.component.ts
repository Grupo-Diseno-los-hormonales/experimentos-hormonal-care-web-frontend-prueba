<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { ReminderService } from '../../../notifications/services/reminder.service';
=======
import { Component } from '@angular/core';
import {Router, RouterLink, RouterModule} from '@angular/router';
import { UserTypeService } from '../../services/user-type.service';
import { UserType } from '../../model/user-type.model';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {CommonModule} from "@angular/common";
import {ColleagueSearchComponent} from "../../../communications/pages/colleague-search/colleague-search.component";
import {AuthenticationService} from "../../../iam/services/authentication.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {LanguageSwitcherComponent} from "../../components/language-switcher/language-switcher.component";
>>>>>>> fusion-repo2

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
<<<<<<< HEAD
=======
    TranslateModule,
 LanguageSwitcherComponent
>>>>>>> fusion-repo2
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
<<<<<<< HEAD
    private reminderService: ReminderService,
  ) {}

  ngOnInit(): void {
    this.updateCount();
  }

  updateCount(): void {
    this.unreadCount = this.reminderService.getUnreadCount();
  }

  navigateToDoctors(): void {
=======
    private translate: TranslateService,
  ) {
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);

  }
  selectedLang = localStorage.getItem('lang') || 'es';

  changeLang(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.selectedLang = lang;
  }
  optionsPatients = [
    { path: '/homePatient', title: 'Home', icon: 'assets/images/home-icon.png', key: 'home' },
    { path: '/calendarPatientView', title: 'Calendar', icon: 'assets/images/calendar.png', key: 'calendar' },
    { path: '/messagesPatient', title: 'Messages', icon: 'assets/images/message.png', key: 'messages' },
    { path: '/notificationsPatient', title: 'Notifications', icon: 'assets/images/bell.png', key: 'notifications' },
    { path: '/patientProfile', title: 'Profile', icon: 'assets/images/profile-icon.png', key: 'profile' }
  ];

  navigateToDoctors() {
>>>>>>> fusion-repo2
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
