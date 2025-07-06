import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Location, NgForOf, NgIf} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserTypeService } from '../../../shared/services/user-type.service';
import { PatientsDataService } from '../../../medical-history/services/patients-data.service';
import { ReassignPatientComponent } from '../../../admin/pages/reassign-patient/reassign-patient.component';

import { PatientEntity } from '../../../profiles/model/patient.entity';
import { AnnouncementService } from '../../../notifications/services/announcement.service';
import { AnnouncementEntity } from '../../../notifications/model/announcement.entity';
import { AnnouncementPopupComponent } from '../../../notifications/components/announcement-popup/announcement-popup.component';
import {FormBuilder, FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../../iam/services/authentication.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {DarkModeService} from "../../../shared/services/dark-mode.service";
import {MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-home-doctor',
  standalone: true,
  templateUrl: './home-doctor.component.html',
  imports: [
    TranslateModule,
    MatSidenavContainer,
    MatSidenavContent,
    NgForOf,
    MatIcon,
    MatProgressSpinner,
    FormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./home-doctor.component.css']
})
export class HomeDoctorComponent implements OnInit {
  isLoading: boolean = true;
  searchTerm: string = '';
  patients: PatientEntity[] = [];
  selectedLang = localStorage.getItem('lang') || 'es';
  isDarkMode = false;
  constructor(
    private userTypeService: UserTypeService,
    private router: Router,
    private location: Location,
    private patientsDataService: PatientsDataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private announcementService: AnnouncementService,
    private translate: TranslateService,
    private darkModeService: DarkModeService,
  ) {
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.isDarkMode=this.darkModeService.current;
  }
  changeLang(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.selectedLang = lang;
  }
  toggleDarkMode(): void {
    this.darkModeService.toggle();
    this.isDarkMode = this.darkModeService.current;
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
