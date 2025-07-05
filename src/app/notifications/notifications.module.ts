import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsPatientsComponent } from './pages/notifications-patients/notifications-patients.component';
import { NotificationsViewComponent } from './pages/notifications-view/notifications-view.component';
import { AnnouncementsAdminComponent } from '../admin/pages/announcements-admin/announcements-admin.component';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    AnnouncementsAdminComponent,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    NotificationsPatientsComponent,
    NotificationsViewComponent,
  ]
})
export class NotificationsModule {}
