import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { DarkModeService } from "../../services/dark-mode.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../iam/services/authentication.service";

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIcon,
  ]
})
export class HeaderAdminComponent implements OnInit {
  isDarkMode = false;
  showLogoutModal = false;

  constructor(
    private darkModeService: DarkModeService,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe(mode => {
      this.isDarkMode = mode;
    });

    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      this.darkModeService.setDarkMode(true);
    }
  }

  toggleDarkMode(): void {
    const newMode = !this.isDarkMode;
    this.darkModeService.setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
  }

  logout(): void {
    this.showLogoutModal = true; // Mostrar el modal de confirmación
  }

  closeLogoutModal(confirm: boolean): void {
    this.showLogoutModal = false;
    if (confirm) {
      localStorage.removeItem('dark-mode');
      this.authService.signOut();
      this.router.navigate(['/login']);
    }
  }
}
