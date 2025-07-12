import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { UserTypeService } from "../../../shared/services/user-type.service";
import { UserType } from '../../../shared/model/user-type.model';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {LanguageSwitcherComponent} from "../../../shared/components/language-switcher/language-switcher.component";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {DarkModeService} from "../../../shared/services/dark-mode.service";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-select-user-role',
  standalone: true,
  templateUrl: './select-user-role.component.html',
  imports: [
    RouterLink,
    LanguageSwitcherComponent,
    TranslateModule,
    MatIcon,
    MatIconButton,
    MatTooltip
  ],
  styleUrls: ['./select-user-role.component.css']
})
export class SelectUserRoleComponent {
  isDarkMode = false;
  optionRoles = [
    { type: 'patient', title: 'Patient', icon: 'assets/images/patient-icon.png' },
    { type: 'endocrinologist', title: 'Endocrinologist', icon: 'assets/images/doctor-icon.png' },
    { type: 'admin', title: 'Administrator', icon: 'assets/images/admin-icon.png' } // si vas a usar admin
  ];

  constructor(
    private userTypeService: UserTypeService,
    private router: Router,
    private translate: TranslateService,
    private darkModeService: DarkModeService,
  ) {
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.isDarkMode = this.darkModeService.current;

  }
  selectedLang = localStorage.getItem('lang') || 'es';

  changeLang(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.selectedLang = lang;
  }

  selectRole(type: UserType) {
    this.userTypeService.setUserType(type);
    this.router.navigate(['/register']); // ✅ Aquí se redirige al formulario
  }
  ngAfterViewInit(): void {
    const dark = localStorage.getItem('dark-mode') === 'true';
    this.isDarkMode = dark;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  toggleDarkMode(): void {
    this.darkModeService.toggle();
    this.isDarkMode = this.darkModeService.current;
  }

}
