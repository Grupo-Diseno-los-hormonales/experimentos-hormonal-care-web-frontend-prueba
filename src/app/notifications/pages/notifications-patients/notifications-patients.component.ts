import { Component, OnInit } from '@angular/core';
import { AnnouncementEntity } from '../../model/announcement.entity';
import { AnnouncementService } from '../../services/announcement.service';
import { MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle, MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {Reminder} from "../../model/reminder.model";
import {ReminderService} from "../../services/reminder.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-notifications-patients',
  standalone: true,
  imports: [
    CommonModule,
    MatCardSubtitle,
    MatCardTitle,
    MatSidenavContent,
    MatDialogModule,
    MatButtonModule,
    MatSidenavContainer,
    MatCard,
    MatCardAvatar,
    MatCardHeader,
    MatIcon,
    MatCardContent,
    MatCardActions,
    TranslateModule
  ],
  templateUrl: './notifications-patients.component.html',
  styleUrls: ['./notifications-patients.component.css']
})
export class NotificationsPatientsComponent implements OnInit {
  todayReminders: Reminder[] = [];
  notifications: any[] = []; // otras notificaciones
  announcements: (AnnouncementEntity & { expanded?: boolean })[] = []; // comunicados con toggle


  constructor(private announcementService: AnnouncementService, private reminderService: ReminderService,
  private translate: TranslateService) {
  const lang = this.selectedLang;
  this.translate.setDefaultLang(lang);
  this.translate.use(lang);

  // Debug opcional
  this.translate.get('notificationMessages.nuevaCitaMedica').subscribe(res => {
  console.log('Traducción cargada:', res);
});
}
  private isNewAppointment(title: string): boolean {
    return ['Nueva Cita Médica', 'New Medical Appointment'].includes(title);
  }

  selectedLang = localStorage.getItem('lang') || 'es';



  changeLang(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.selectedLang = lang;
  }

  ngOnInit(): void {
    this.todayReminders = this.reminderService.getTodaysReminders();
    const saved = localStorage.getItem('notifications');
    this.notifications = saved ? JSON.parse(saved) : [];

    this.notifications = this.notifications.map(n => ({
      ...n,
      type: this.isNewAppointment(n.title) ? 'newAppointment' : 'other'
    }));

    this.announcements = this.announcementService.getForAudience('patients')
      .map(a => ({ ...a, expanded: false }));

    this.translate.onLangChange.subscribe(() => {
      this.updateTranslatedMessages();
    });

    this.updateTranslatedMessages();
  }

  updateTranslatedMessages() {
    const locale = this.translate.currentLang || 'es';

    for (let notif of this.notifications) {
      const appointmentDate = new Date(notif.date);
      const dateStr = formatDate(appointmentDate, 'fullDate', locale);
      const timeStr = formatDate(appointmentDate, 'shortTime', locale);

      if (notif.type === 'newAppointment') {
        this.translate.get([
          'notificationMessages.nuevaCitaMedica',
          'notificationMessages.tituloNuevaCita'
        ], {
          date: dateStr,
          time: timeStr,
          doctor: notif.doctorName
        }).subscribe(translated => {
          notif.translatedMessage = translated['notificationMessages.nuevaCitaMedica'];
          notif.translatedTitle = translated['notificationMessages.tituloNuevaCita'];
        });
      } else {
        // 🔄 Traduce el título genérico
        this.translate.get(`notificationTitles.${notif.title}`).subscribe(transTitle => {
          notif.translatedTitle = transTitle;
        });

        // 🔄 Traduce el mensaje genérico (si aplica)
        this.translate.get(`notificationMessages.${notif.message}`).subscribe(transMsg => {
          notif.translatedMessage = transMsg;
        }, _ => {
          // fallback si no hay clave, usa texto plano
          notif.translatedMessage = notif.message;
        });
      }
    }
  }



  deleteNotification(index: number): void {
    this.notifications.splice(index, 1);
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }
  markAsRead(reminderId: string): void {
    this.reminderService.markAsRead(reminderId);
    this.todayReminders = this.reminderService.getTodaysReminders();
  }
  deleteAnnouncement(index: number): void {
    this.announcements.splice(index, 1);
    localStorage.setItem('announcements', JSON.stringify(this.announcements));
  }

  toggleDescription(announcement: AnnouncementEntity & { expanded?: boolean }): void {
    announcement.expanded = !announcement.expanded;
  }

  getTranslatedMessage(notif: any): string {
    if (!notif?.date || !notif?.doctorName) return '';

    const appointmentDate = new Date(notif.date);
    const locale = this.translate.currentLang || 'es';

    const dateStr = formatDate(appointmentDate, 'fullDate', locale);
    const timeStr = formatDate(appointmentDate, 'shortTime', locale);

    if (notif.type === 'newAppointment') {
      return this.translate.instant('notificationMessages.nuevaCitaMedica', {
        date: dateStr,
        time: timeStr,
        doctor: notif.doctorName
      });
    }

    return notif.message;
  }
}
