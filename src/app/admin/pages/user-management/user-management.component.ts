import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {UserListComponent} from "./components/user-list/user-list.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    UserListComponent,
    TranslateModule
  ]
})
export class UserManagementComponent {
constructor(private translate: TranslateService,) {
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
}
