import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../iam/services/authentication.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ProfilesModule} from "../../profiles.module";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {InfoProfilePatiensComponent} from "../../components/info-profile-patiens/info-profile-patiens.component";
import {
  InfoCardProfilePatiensComponent
} from "../../components/info-card-profile-patiens/info-card-profile-patiens.component";
import {PhotoPatientsComponent} from "../../components/photo-patients/photo-patients.component";

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  templateUrl: './patient-profile.component.html',
  imports: [
    MatGridList,
    MatGridTile,
    TranslateModule,
    PhotoPatientsComponent,
    InfoCardProfilePatiensComponent,
    InfoProfilePatiensComponent
  ],
  styleUrl: './patient-profile.component.css'
})
export class PatientProfileComponent {
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
  logout(): void {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
