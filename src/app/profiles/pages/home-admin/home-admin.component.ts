import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {AuthenticationService} from "../../../iam/services/authentication.service";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatTooltip, MatTooltipModule} from "@angular/material/tooltip";
import {MatButton, MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
  imports: [
    MatIcon,
    CommonModule,
    MatTooltip,
    MatButton,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule
  ],
  standalone: true
})
export class HomeAdminComponent implements OnInit {
  adminName: string = '';
  username: string = '';
  userId: number = 0;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.adminName = user?.name || 'Admin';

    const userType = user?.role;

    if (userType !== 'admin') {
      this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }

    this.authService.currentUsername.subscribe(name => {
      this.username = name;
    });

    this.authService.currentUserId.subscribe(id => {
      this.userId = id;
    });

    // Validación opcional: redirige si no está logueado
    this.authService.isSignedIn.subscribe(isLogged => {
      if (!isLogged) {
        this.router.navigate(['/login']);
      }
    });
  }


  goTo(route: string): void {
    console.log('Clicked route:', route); // <- PRUEBA
    const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
    this.router.navigate([`/admin/${cleanRoute}`]);
  }
}
