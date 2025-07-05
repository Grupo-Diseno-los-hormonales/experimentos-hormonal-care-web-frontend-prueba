// src/app/admin/components/admin-layout/admin-layout.component.ts
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Router, RouterModule, RouterOutlet} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TranslateModule} from "@ngx-translate/core";
import {DarkModeService} from "../../../shared/services/dark-mode.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatIcon,
    MatTooltipModule,
    TranslateModule
  ]
})
export class AdminLayoutComponent {
  isDarkMode = false;
  isSidebarClosed = false;

  constructor(
    public translate: TranslateService,
    private darkModeService: DarkModeService,
    private router: Router) {

      const lang = localStorage.getItem('lang') || 'es';
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);

    }
    selectedLang = localStorage.getItem('lang') || 'es';

    changeLang(lang: string): void {
      this.translate.use(lang);
      localStorage.setItem('lang', lang);
      this.selectedLang = lang;


    const stored = localStorage.getItem('dark-mode') === 'true';
    this.isDarkMode = stored;
    this.darkModeService.setDarkMode(stored);


    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe(mode => {
      this.isDarkMode = mode;
    });
    const savedMode = localStorage.getItem('dark-mode');
    this.isDarkMode = savedMode === 'true';

    // Aplica clase al body SOLO si estás en Admin
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }
  ngOnDestroy(): void {
    document.body.classList.remove('dark-mode');
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }



  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
    const layout = document.querySelector('.admin-layout');
    layout?.classList.toggle('sidebar-collapsed', this.isSidebarClosed);
  }


  switchLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  protected readonly HTMLSelectElement = HTMLSelectElement;
  goTo(route: string): void {
    const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
    this.router.navigate([`/admin/${cleanRoute}`]);
  }

}
