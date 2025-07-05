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
    TranslateModule,
 LanguageSwitcherComponent
  ]

})
export class HeaderPatientComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
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
    this.router.navigate(['/available-doctors']);
  }
  logout(): void {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
