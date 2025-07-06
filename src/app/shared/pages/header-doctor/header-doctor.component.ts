import { Component } from '@angular/core';
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
  }
}
