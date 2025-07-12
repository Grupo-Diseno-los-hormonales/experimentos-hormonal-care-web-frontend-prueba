import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColleagueSearchComponent } from "../../../communications/pages/colleague-search/colleague-search.component";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import {AuthenticationService} from "../../../iam/services/authentication.service";

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
  ]
})
export class HeaderDoctorComponent {
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
  }
}
