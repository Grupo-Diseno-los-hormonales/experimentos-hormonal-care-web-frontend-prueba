// Definir la interfaz Doctor antes de la clase

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule} from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { DoctorService} from '../../../communications/services/doctor.service';
import {Doctor} from '../../../communications/model/doctor.models';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
@Component({
  standalone: true,
  selector: 'app-find-doctors-patient',
  templateUrl: './find-doctors-patient.component.html',
  styleUrls: ['./find-doctors-patient.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatTooltipModule,
    TranslateModule,
  ],
})
export class FindDoctorsPatientComponent {
  searchQuery: string = '';
  filterCriteria: string = 'rating';
  maxPrice: number = 0;
  minRating: number = 0;
  showAllDoctors: boolean = false;  // ✅ Nueva variable
  updateFilters() {
    console.log("Search Query:", this.searchQuery, "Max Price:", this.maxPrice, "Min Rating:", this.minRating);
  }

  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService, private router: Router,
              private translate: TranslateService,) {
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
  }


  // Actualizar la definición del array doctors para usar la interfaz
  currentPage: number = 1;
  doctorsPerPage: number = 2;

  get paginatedDoctors() {
    let startIndex = (this.currentPage - 1) * this.doctorsPerPage;
    let endIndex = Math.min(startIndex + this.doctorsPerPage, this.filteredDoctors.length); // ✅ Ajuste para no perder registros

    console.log(`Mostrando doctores ${startIndex} a ${endIndex} de ${this.filteredDoctors.length}`);

    return this.filteredDoctors.slice(startIndex, endIndex);
  }

  favorites: Set<number> = new Set();

  toggleFavorite(doctorId: number) {
    if (this.favorites.has(doctorId)) {
      this.favorites.delete(doctorId);
    } else {
      this.favorites.add(doctorId);
    }
    console.log("Favoritos actualizados:", Array.from(this.favorites));  // ✅ Verifica si se actualiza correctamente
  }

  changePage(next: boolean) {
    let totalPages = Math.ceil(this.filteredDoctors.length / this.doctorsPerPage);

    console.log("Total Pages:", totalPages);
    console.log("Before Change - Current Page:", this.currentPage);

    if (next && this.currentPage < totalPages) {  // ✅ Permite alcanzar la última página correctamente
      this.currentPage++;
    } else if (!next && this.currentPage > 1) {
      this.currentPage--;
    }

    console.log("After Change - Current Page:", this.currentPage);
  }

  get filteredDoctors() {
    if (!this.doctors) return [];  // ✅ Si `this.doctors` no está definido, devuelve un array vacío

    return this.doctors
      .filter(doc => this.maxPrice === 0 || doc.price <= this.maxPrice)
      .filter(doc => this.minRating === 0 || doc.rating >= this.minRating)
      .filter(doc => doc.name.toLowerCase().includes(this.searchQuery.toLowerCase().trim()))
      .sort((a, b) => this.filterCriteria === 'price' ? a.price - b.price : b.rating - a.rating);
  }

  trackDoctor(index: number, doctor: any) {
    return doctor.id;  // Usa el ID del doctor para evitar renderizados innecesarios
  }

  reloadPage(): void {
    window.location.reload(); // ✅ Fuerza la actualización de la página
  }

  resetFilters() {
    this.searchQuery = '';
    this.filterCriteria = 'rating';
    this.maxPrice = 0;
    this.minRating = 0;
  }

  toggleShowMoreDoctors() {
    this.showAllDoctors = !this.showAllDoctors;  // ✅ Alternar vista completa
  }

  protected readonly Math = Math;


  showDoctors(): void {
    this.router.navigate(['/doctor-list']);
  }

  navigateToDoctors() {
    this.router.navigate(['/available-doctors']);
  }

  // Nuevo método para agendar cita
  scheduleAppointment(doctorId: number) {
    this.router.navigate(['/appointments', doctorId]);
    // Aquí puedes poner la lógica para ir a una página de agendar cita
    // o abrir un modal, etc.
  }
}
