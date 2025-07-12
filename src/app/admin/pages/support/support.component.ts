import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { SupportTicket } from "./model/support-ticket.model";
import { LiveChatComponent } from "./components/live-chat/live-chat.component";
import { KnowledgeBaseComponent } from "./components/knowledge-base/knowledge-base.component";
import { AnalyticsComponent } from "./components/analytics/analytics.component";
import { SupportSettingsComponent } from "./components/support-settings/support-settings.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    TicketListComponent,
    LiveChatComponent,
    KnowledgeBaseComponent,
    AnalyticsComponent,
    SupportSettingsComponent,
    TranslateModule,
  ],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  constructor(private translate: TranslateService) {
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

  selectedTabIndex = 0;


  mockTickets:SupportTicket[] = [
    {
      id: 'TCK-001',
      createdAt: new Date().toISOString(),
      userRole: 'doctor',
      userName: 'Dr. Smith',
      userEmail: 'Smith@doctor.hormonalcare.com',
      subjectKey: 'CALENDAR_SYNC',
      subject: this.translate.instant('SUPPORT.SUBJECTS.CALENDAR_SYNC') as string,
      messageKey: 'CALENDAR_NOT_SYNCING',
      message: this.translate.instant('SUPPORT.MESSAGES.CALENDAR_NOT_SYNCING') as string,
      priority: 'high',
      status: 'open',
      attachments: ['screenshot1.png', 'error_log.txt']
    },
    {
      id: 'TCK-002',
      createdAt: new Date().toISOString(),
      userRole: 'patient',
      userName: 'Maria Torres',
      userEmail: 'Maria@patient.hormonalcare.com',
      subjectKey: 'UPLOAD_LAB',
      subject: this.translate.instant('SUPPORT.SUBJECTS.UPLOAD_LAB') as string,
      messageKey: 'UPLOAD_403',
      message: this.translate.instant('SUPPORT.MESSAGES.UPLOAD_403') as string,
      priority: 'medium',
      status: 'in_progress'
    },
    {
      id: 'TCK-003',
      createdAt: '2025-05-14T10:00:00Z',
      userRole: 'patient',
      userName: 'Alice',
      userEmail: 'alice@patient.hormonalcare.com',
      subjectKey: 'LOGIN_ISSUE',
      subject: this.translate.instant('SUPPORT.SUBJECTS.LOGIN_ISSUE') as string,
      messageKey: 'LOGIN_CANNOT_ACCESS',
      message: this.translate.instant('SUPPORT.MESSAGES.LOGIN_CANNOT_ACCESS') as string,
      priority: 'high',
      status: 'open',
      attachments: ['screenshot1.png', 'error_log.txt']
    },
    {
      id: 'TCK-004',
      createdAt: '2025-06-10T15:20:00Z',
      userRole: 'patient',
      userName: 'Pedro Sanchez',
      userEmail: 'pedro@patient.hormonalcare.com',
      subjectKey: 'REMINDER_NOT_WORKING',
      subject: this.translate.instant('SUPPORT.SUBJECTS.REMINDER_NOT_WORKING') as string,
      messageKey: 'REMINDER_NO_RECEIVED',
      message: this.translate.instant('SUPPORT.MESSAGES.REMINDER_NO_RECEIVED') as string,
      priority: 'medium',
      status: 'open',
      attachments: ['reminder_bug.png']
    },
    {
      id: 'TCK-005',
      createdAt: '2025-06-12T08:45:00Z',
      userRole: 'doctor',
      userName: 'Dr. Laura Martinez',
      userEmail: 'laura@doctor.hormonalcare.com',
      subjectKey: 'HISTORY_NOT_LOADING',
      subject: this.translate.instant('SUPPORT.SUBJECTS.HISTORY_NOT_LOADING') as string,
      messageKey: 'HISTORY_BLANK_PAGE',
      message: this.translate.instant('SUPPORT.MESSAGES.HISTORY_BLANK_PAGE') as string,
      priority: 'high',
      status: 'in_progress',
      attachments: ['console_error.txt']
    },
    {
      id: 'TCK-006',
      createdAt: '2025-06-01T12:10:00Z',
      userRole: 'patient',
      userName: 'Marco Rojas',
      userEmail: 'marco@patient.hormonalcare.com',
      subjectKey: 'APP_CRASH_LOGIN',
      subject: this.translate.instant('SUPPORT.SUBJECTS.APP_CRASH_LOGIN') as string,
      messageKey: 'APP_CRASH_AFTER_LOGIN',
      message: this.translate.instant('SUPPORT.MESSAGES.APP_CRASH_AFTER_LOGIN') as string,
      priority: 'high',
      status: 'closed'
    },
    {
      id: 'TCK-007',
      createdAt: '2025-06-13T17:00:00Z',
      userRole: 'doctor',
      userName: 'Dr. Andrea Paredes',
      userEmail: 'andrea@doctor.hormonalcare.com',
      subjectKey: 'VIEW_LAB_RESULTS',
      subject: this.translate.instant('SUPPORT.SUBJECTS.VIEW_LAB_RESULTS') as string,
      messageKey: 'CANNOT_OPEN_RESULTS',
      message: this.translate.instant('SUPPORT.MESSAGES.CANNOT_OPEN_RESULTS') as string,
      priority: 'medium',
      status: 'open',
      attachments: ['lab_result_issue.mp4']
    },
    {
      id: 'TCK-008',
      createdAt: '2025-06-05T09:30:00Z',
      userRole: 'patient',
      userName: 'Lucia Fernandez',
      userEmail: 'lucia@patient.hormonalcare.com',
      subjectKey: 'NO_ASSIGNED_DOCTOR',
      subject: this.translate.instant('SUPPORT.SUBJECTS.NO_ASSIGNED_DOCTOR') as string,
      messageKey: 'DASHBOARD_NO_DOCTOR',
      message: this.translate.instant('SUPPORT.MESSAGES.DASHBOARD_NO_DOCTOR') as string,
      priority: 'low',
      status: 'resolved'
    },
    {
      id: 'TCK-009',
      createdAt: '2025-06-14T20:00:00Z',
      userRole: 'doctor',
      userName: 'Dr. Rafael Castillo',
      userEmail: 'rafael@doctor.hormonalcare.com',
      subjectKey: 'SLOW_PLATFORM',
      subject: this.translate.instant('SUPPORT.SUBJECTS.SLOW_PLATFORM') as string,
      messageKey: 'PLATFORM_LAGS',
      message: this.translate.instant('SUPPORT.MESSAGES.PLATFORM_LAGS') as string,
      priority: 'high',
      status: 'in_progress'
    }
  ];
}
