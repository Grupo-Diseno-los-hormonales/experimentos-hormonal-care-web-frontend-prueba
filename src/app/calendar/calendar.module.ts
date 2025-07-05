import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';

// Componentes del módulo
import { AppointmentsPageComponent } from './pages/appointments-page/appointments-page.component';
import { AddEventCardComponent } from './components/add-event-card/add-event-card.component';
import { CalendarViewComponent } from './pages/calendar-view/calendar-view.component';
import { CalendarDoctorComponent } from './components/calendar-doctor/calendar-doctor.component'; // standalone
import { CalendarPatientViewComponent } from './pages/calendar-patient-view/calendar-patient-view.component';
import { ScheduleFollowUpComponent } from './pages/schedule-follow-up/schedule-follow-up.component';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Otros módulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import {TranslateModule} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";

@NgModule({
  declarations: [
    AppointmentsPageComponent,
    AddEventCardComponent,
    CalendarViewComponent,
    CalendarPatientViewComponent,
    ScheduleFollowUpComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    MatCardModule,
    FullCalendarModule,
    CalendarDoctorComponent, // standalone
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButton
  ]
})
export class CalendarModule {}
