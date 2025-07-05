import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserTypeService } from '../../../shared/services/user-type.service';
import { PatientsDataService } from '../../../medical-history/services/patients-data.service';
import { ReassignPatientComponent } from '../../../admin/pages/reassign-patient/reassign-patient.component';

import { PatientEntity } from '../../../profiles/model/patient.entity';
import { AnnouncementService } from '../../../notifications/services/announcement.service';
import { AnnouncementEntity } from '../../../notifications/model/announcement.entity';
import { AnnouncementPopupComponent } from '../../../notifications/components/announcement-popup/announcement-popup.component';
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../../iam/services/authentication.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-home-doctor',
  templateUrl: './home-doctor.component.html',
  styleUrls: ['./home-doctor.component.css']
})
export class HomeDoctorComponent implements OnInit {
  isLoading: boolean = true;
  searchTerm: string = '';
  patients: PatientEntity[] = [];

  constructor(
    private userTypeService: UserTypeService,
    private router: Router,
    private location: Location,
    private patientsDataService: PatientsDataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private announcementService: AnnouncementService,
    private translate: TranslateService
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

  ngOnInit(): void {
    const userType = this.userTypeService.getUserType();

    if (userType !== 'endocrinologist') {
      this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }

    this.loadPatients();

    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      history.pushState(null, '', location.href);
    };

    // ✅ Mostrar comunicado emergente si hay alguno sin leer (doctor)
    const unreadAnnouncements: AnnouncementEntity[] =
      this.announcementService.getUnreadForAudience('doctors');

    if (unreadAnnouncements.length > 0) {
      unreadAnnouncements.forEach(announcement => {
        this.dialog.open(AnnouncementPopupComponent, {
          data: announcement,
          disableClose: true,
          width: '400px'
        });

        this.announcementService.markAsRead(announcement.id, 'doctors');
      });
    }
  }

  loadPatients(): void {
    this.isLoading = true;
    this.patientsDataService.getAll().subscribe({
      next: (data: PatientEntity[]) => {
        this.patients = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading patients', err);
        this.isLoading = false;
      }
    });
  }

  get filteredPatients(): PatientEntity[] {
    return this.patients.filter(p =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  transferPatient(patient: PatientEntity): void {
    this.router.navigate(['/doctor/transfer'], { state: { patient } });
  }

  openTransferDialog(patient: PatientEntity): void {
    const dialogRef = this.dialog.open(ReassignPatientComponent, {
      width: '400px',
      data: {
        patient,
        patientFullName: `${patient.firstName} ${patient.lastName}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Transfer completed:', result);
      }
    });
  }
}
