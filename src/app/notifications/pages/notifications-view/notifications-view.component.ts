import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../services/announcement.service';
import { AnnouncementEntity } from '../../model/announcement.entity';
import { MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatePipe, NgForOf, NgIf } from '@angular/common';

interface Notification {
  id?: string;
  title: string; // clave de traducción (ej. 'APPOINTMENT_WITH')
  name?: string; // nombre del doctor/paciente
  description: string;
  date: string;
  time: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-notifications-view',
  standalone: true,
  templateUrl: './notifications-view.component.html',
  imports: [
    MatSidenavContainer,
    TranslateModule,
    MatSidenavContent,
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatButton,
    MatCardTitle,
    MatCardSubtitle,
    MatIcon,
    MatIconButton,
    MatCardContent,
    DatePipe,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./notifications-view.component.css']
})
export class NotificationsViewComponent implements OnInit {
  notifications: Notification[] = [
    {
      title: 'NOTIFICATIONS.APPOINTMENT_WITH',
      name: 'Gabriel Ramírez',
      description: 'Tienes una cita hoy a las 6:00 p.m.',
      date: '08/05/2025',
      time: '18:00',
      expanded: false
    },
    {
      title: 'NOTIFICATIONS.NEW_APPOINTMENT',
      description: 'Cita con Ana Torres el 10 de mayo a las 9:00 a.m.',
      date: '10/05/2025',
      time: '09:00',
      expanded: false
    }
  ];

  announcements: (AnnouncementEntity & { expanded: boolean })[] = [];

  constructor(
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
    this.announcements = this.announcementService
      .getForAudience('doctors')
      .map(a => ({ ...a, expanded: false }));
  }

  toggle(index: number): void {
    this.notifications[index].expanded = !this.notifications[index].expanded;
  }

  remove(index: number): void {
    this.notifications.splice(index, 1);
  }

  toggleDescription(a: any): void {
    a.expanded = !a.expanded;
  }

  deleteAnnouncement(index: number): void {
    this.announcements.splice(index, 1);
  }
}
