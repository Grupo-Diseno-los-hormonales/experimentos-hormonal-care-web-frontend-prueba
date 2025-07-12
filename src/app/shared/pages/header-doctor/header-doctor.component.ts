import { Component } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { ColleagueSearchComponent } from "../../../communications/pages/colleague-search/colleague-search.component";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import {AuthenticationService} from "../../../iam/services/authentication.service";
=======
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ColleagueSearchComponent } from "../../../communications/pages/colleague-search/colleague-search.component";
import { RouterModule } from "@angular/router";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import {LanguageSwitcherComponent} from "../../components/language-switcher/language-switcher.component";
import {DarkModeService} from "../../services/dark-mode.service";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
>>>>>>> fusion-repo2

@Component({
  selector: 'app-header-doctor',
  templateUrl: './header-doctor.component.html',
  styleUrls: ['./header-doctor.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    ColleagueSearchComponent,
    MatButtonModule,
    TranslateModule,
    LanguageSwitcherComponent,
    NgOptimizedImage,
    MatIcon,
    MatTooltip
  ]
})
export class HeaderDoctorComponent {
<<<<<<< HEAD
  showLogoutModal = false;

  options = [
    { path: '/homeDoctor', title: 'Home', icon: 'assets/images/home-icon.png' },
    { path: '/calendar', title: 'Calendar', icon: 'assets/images/calendar.png' },
    { path: '/messages', title: 'Messages', icon: 'assets/images/message.png' },
    { path: '/notifications', title: 'Notifications', icon: 'assets/images/bell.png' },
    { path: '/doctorProfile', title: 'Profile', icon: 'assets/images/profile-icon.png' },
  ];

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  logout(): void {
    this.showLogoutModal = true;
  }

  closeLogoutModal(confirm: boolean): void {
    this.showLogoutModal = false;
    if (confirm) {
      this.authService.signOut();
      this.router.navigate(['/login']);
    }
=======
  isDarkMode = false;
  options = [
    { path: '/homeDoctor', title: 'HEADER.HOME', icon: 'assets/images/home-icon.png' },
    { path: '/calendar', title: 'HEADER.CALENDAR', icon: 'assets/images/calendar.png' },
    { path: '/messages', title: 'HEADER.MESSAGES', icon: 'assets/images/message.png' },
    { path: '/notifications', title: 'HEADER.NOTIFICATIONS', icon: 'assets/images/bell.png' },
    { path: '/doctorProfile', title: 'HEADER.PROFILE', icon: 'assets/images/profile-icon.png' }
  ];

  selectedLang = localStorage.getItem('lang') || 'es';

  constructor(private translate: TranslateService,
  private darkModeService: DarkModeService) {
    const lang = this.selectedLang;
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.isDarkMode=this.darkModeService.current;
  }
  toggleDarkMode(): void {
    this.darkModeService.toggle();
    this.isDarkMode = this.darkModeService.current;
  }
  changeLang(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.selectedLang = lang;
>>>>>>> fusion-repo2
  }
}
