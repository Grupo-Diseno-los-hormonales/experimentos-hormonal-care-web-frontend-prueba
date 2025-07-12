import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Doctor } from '../../../communications/model/doctor.models';
import { DoctorService } from '../../../communications/services/doctor.service';

import {TranslateModule, TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-available-doctors',
  standalone: true,
  templateUrl: './available-doctors.component.html',
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    TranslateModule
  ],
  styleUrls: ['./available-doctors.component.css']
})
export class AvailableDoctorsComponent implements OnInit {
  doctors: (Doctor & { isVerified?: boolean, isOnline?: boolean })[] = [];

  constructor(private doctorService: DoctorService, private router: Router, private translate: TranslateService) {
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
  ngOnInit() {
    this.doctors = this.doctorService.getDoctors();
    // Simula que algunos doctores están en línea y/o verificados
    this.doctors = this.doctorService.getDoctors().map((doctor, i) => ({
      ...doctor,
      isVerified: i % 2 === 0,   // Ejemplo: verifica solo algunos
      isOnline: i % 3 === 0      // Ejemplo: online solo algunos
    }));
  }

  searchQuery: string = '';
  sortOption: string = '';

  get filteredDoctors(): (Doctor & { isVerified?: boolean, isOnline?: boolean })[] {
    let result = this.doctors.filter(doc =>
      doc.name.toLowerCase().includes(this.searchQuery.toLowerCase().trim())
    );

    if (this.sortOption === 'price') {
      result = result.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'rating') {
      result = result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }

  goToDoctorProfile(doctorId: number): void {
    this.router.navigate(['/doctor-profile', doctorId]);
  }

  navigateToDoctors() {
    this.router.navigate(['/doctor-list']);
  }

  goBack(): void {
    this.router.navigate(['/homePatient']);
  }
}
