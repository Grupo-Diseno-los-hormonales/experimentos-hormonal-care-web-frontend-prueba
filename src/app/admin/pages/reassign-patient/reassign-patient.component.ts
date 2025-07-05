import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-reassign-patient',
  templateUrl: './reassign-patient.component.html',
  styleUrls: ['./reassign-patient.component.css'],
  imports: [
    NgIf,
    FormsModule,
    NgForOf,
    CommonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    TranslateModule,
  ],
  standalone: true
})
export class ReassignPatientComponent {
  reassignForm: FormGroup;
  successMessage: string | null = null;
  selectedPatient: { id: string; fullName: string; age: number } | null = null;
  selectedDoctorId: string = '';
  doctors = [
    { id: '1', name: 'Dr. Juan Pérez' },
    { id: '2', name: 'Dra. María Rodríguez' },
    { id: '3', name: 'Dr. Luis García' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() private dialogRef?: MatDialogRef<ReassignPatientComponent>,

  ) {
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);


    this.reassignForm = this.fb.group({
      currentDoctor: ['', Validators.required],
      newDoctor: ['', Validators.required],
      patientName: ['', Validators.required],
      reason: ['', Validators.required]
    });

    // Soporte para acceso como ruta directa o modal
    if (data?.patient) {
      this.selectedPatient = {
        id: data.patient.id,
        fullName: `${data.patient.firstName} ${data.patient.lastName}`,
        age: data.patient.age
      };
    } else {
      // Fallback si se accede directamente vía ruta
      this.selectedPatient = {
        id: 'demo-patient',
        fullName: 'Test Patient',
        age: 30
      };
    }
  }
  selectedLang = localStorage.getItem('lang') || 'es';

  changeLang(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.selectedLang = lang;
  }
  onSubmit(): void {
    if (this.reassignForm.valid) {
      const data = this.reassignForm.value;
      console.log('Reassigning patient:', data);
      this.successMessage = `Paciente ${data.patientName} ha sido transferido exitosamente.`;
      setTimeout(() => this.successMessage = null, 3000);
      this.reassignForm.reset();
    }
  }

  confirmReassignment() {
    console.log('Reassigned to doctor:', this.selectedDoctorId);
    this.successMessage = `Paciente ${this.selectedPatient?.fullName || 'N/A'} ha sido transferido exitosamente.`;

    setTimeout(() => {
      if (this.dialogRef) {
        this.dialogRef.close();
      }
      if (this.selectedPatient?.id) {
        const selectedDoctor = this.doctors.find(doc => doc.id === this.selectedDoctorId);
        this.router.navigate(
          ['/calendar/schedule-follow-up', this.selectedPatient.id],
          {
            state: {
              patientName: this.selectedPatient.fullName,
              patientAge: this.selectedPatient.age,
              doctorName: selectedDoctor?.name || 'N/A'
            }
          }
        );
      }
    }, 2000);
  }

  cancel() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
