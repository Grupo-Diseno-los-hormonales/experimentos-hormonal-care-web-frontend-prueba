import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserTypeService } from '../../../shared/services/user-type.service';
import { FindDoctorsPatientComponent } from '../../components/find-doctors-patient/find-doctors-patient.component';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { PatientsReminderComponent } from '../../components/patients-reminder/patients-reminder.component';
import { PatientsPendingTaskComponent } from '../../components/patients-pending-task/patients-pending-task.component';
import { MatButton } from '@angular/material/button';
import { AnnouncementService } from '../../../notifications/services/announcement.service';
import { AnnouncementEntity } from '../../../notifications/model/announcement.entity';
import { AnnouncementPopupComponent } from '../../../notifications/components/announcement-popup/announcement-popup.component';
import { MatDialog } from '@angular/material/dialog';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatSidenavContainer} from "@angular/material/sidenav";
import {DarkModeService} from "../../../shared/services/dark-mode.service";

@Component({
  selector: 'app-home-patient',
  standalone: true,
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.css'],
  imports: [
    CommonModule,
    PatientsReminderComponent,
    PatientsPendingTaskComponent,
    MatGridListModule,
    FindDoctorsPatientComponent,
    MatButton,
    RouterLink,
    MatIconModule,
    TranslateModule,
    MatSidenavContainer
  ]
})
export class HomePatientComponent implements OnInit {
  isDarkMode = false;
  patientName: string = '';
  doctors = [
    { name: 'Dr. Gómez', price: 90, isVerified: true, image: 'assets/images/doctors/gomez.png' },
    { name: 'Dr. Juan Egüía', price: 100, isVerified: true, image: 'assets/images/doctors/eguia.png' }
  ];
  selectedExam: File | null = null;

  constructor(
    private userTypeService: UserTypeService,
    private announcementService: AnnouncementService,
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService,
    private darkModeService: DarkModeService,
  ) {
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.isDarkMode=this.darkModeService.current;

  }
  selectedLang = localStorage.getItem('lang') || 'es';

  toggleDarkMode(): void {
    this.darkModeService.toggle();
    this.isDarkMode = this.darkModeService.current;
  }
  changeLang(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.selectedLang = lang;
  }

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.patientName = user?.name || 'Paciente';

    const userType = user?.role || this.userTypeService.getUserType();

    // ✅ Redirige si no es paciente
    if (userType !== 'patient') {
      this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }

    // ✅ Evita volver al login con retroceso
    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      history.pushState(null, '', location.href);
    };

    // ✅ Mostrar todos los comunicados no leídos para pacientes
    const announcements = this.announcementService.getForAudience('patients');

    announcements.forEach(announcement => {
      if (!announcement.isRead) {
        this.dialog.open(AnnouncementPopupComponent, {
          data: announcement,
          disableClose: true,
          width: '400px'
        });

        this.announcementService.markAsRead(announcement.id, 'patients');
      }
    });
  }

  onExamSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedExam = input.files[0];
    }
  }

  sendToDoctor(): void {
    if (!this.selectedExam) return;

    const exam = {
      name: this.selectedExam.name,
      uploadedAt: new Date().toISOString(),
      seen: false,
      url: URL.createObjectURL(this.selectedExam)
    };

    const existing = JSON.parse(localStorage.getItem('doctorFiles') || '[]');
    existing.push(exam);
    localStorage.setItem('doctorFiles', JSON.stringify(existing));

    alert('Archivo enviado al doctor exitosamente.');
    this.selectedExam = null;
  }
}
