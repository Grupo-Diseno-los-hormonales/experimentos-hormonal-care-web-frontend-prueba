import { Component } from '@angular/core';
import {AuthenticationService} from "../../../iam/services/authentication.service";
import {Router} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {MatCalendar} from "@angular/material/datepicker";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  templateUrl: './doctor-profile.component.html',
  imports: [
    MatIconButton,
    MatIcon,
    MatButton,
    TranslateModule,
    FormsModule,
    MatCalendar,
    NgForOf
  ],
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent {
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
  doctor = {
    photoUrl: '',
    name: 'Emilio Mauricio',
    surnames: 'Morales Calderón',
    email: 'Emiliomm12@gmail.com',
    qualification: 'Emilio Mauricio',
    schoolNumber: '10',
    fee: '10',
    code: '123-4545-676',
    patients: 5
  };

  defaultPhoto = 'https://via.placeholder.com/150x180.png?text=Photo';
  selectedDate = new Date();

  profileFields = [
    { label: 'Name:', value: this.doctor.name, editable: true },
    { label: 'Surnames:', value: this.doctor.surnames, editable: true },
    { label: 'E-mail:', value: this.doctor.email, editable: true },
    { label: 'Qualification:', value: this.doctor.qualification, editable: true },
    { label: 'School N:', value: this.doctor.schoolNumber, editable: true },
    { label: 'Fee:', value: this.doctor.fee, editable: true },
    { label: 'Code for new patients:', value: this.doctor.code, editable: true },
  ];

  editPhoto() {
    alert('Edit photo clicked!');
  }

  improvePlan() {
    alert('Redirecting to improve plan...');
  }

  editCalendar() {
    alert('Edit calendar clicked');
  }

  configureCertificates() {
    alert('Configure certificates clicked');
  }

  configurePlan() {
    alert('Configure plan clicked');
  }

  setUpNotification() {
    alert('Set up notification clicked');
  }
  logout(): void {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
