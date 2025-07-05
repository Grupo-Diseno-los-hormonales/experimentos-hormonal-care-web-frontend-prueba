import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as Sentry from "@sentry/angular";
import { Router } from '@angular/router';

import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Material y otros módulos...
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { NgOptimizedImage } from "@angular/common";
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { MatAnchor, MatButton, MatIconButton } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatCard, MatCardContent, MatCardHeader } from "@angular/material/card";
import {MatGridList, MatGridListModule, MatGridTile} from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableModule
} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatCheckbox } from "@angular/material/checkbox";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthModule } from './identity-and-access/auth/auth.module';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";

import { PatientsTableComponent } from './profiles/components/patients-table/patients-table.component';
import { SearchDoctorsComponent } from './shared/pages/search-doctors/search-doctors.component';
import { SearchPatiensComponent } from './profiles/components/search-patiens/search-patiens.component';
import { DoctorChatComponent } from './communications/pages/doctor-chat/doctor-chat.component';
import { PatientChatComponent } from './communications/pages/patient-chat/patient-chat.component';
import { HomeDoctorComponent } from './profiles/pages/home-doctor/home-doctor.component';
import { DoctorRegistrationComponent } from './identity-and-access/pages/doctor-registration/doctor-registration.component';
import { PatientsReminderComponent } from './profiles/components/patients-reminder/patients-reminder.component';
import { PatientsUploadExamComponent } from './profiles/components/patients-upload-exam/patients-upload-exam.component';
import { PatientsPendingTaskComponent } from './profiles/components/patients-pending-task/patients-pending-task.component';
import { BackgroundComponent } from './medical-history/components/background/background.component';
import { HeaderComponent } from './medical-history/components/header/header.component';
import { ClinicalhistoryComponent } from './medical-history/components/clinicalhistory/clinicalhistory.component';
import { DignosesandtreatmentComponent } from './medical-history/components/dignosesandtreatment/dignosesandtreatment.component';
import { ExternalreportsComponent } from './medical-history/components/externalreports/externalreports.component';
import { MedicalexamsComponent } from './medical-history/components/medicalexams/medicalexams.component';
import { PatientdataComponent } from './medical-history/components/patientdata/patientdata.component';
import { ReasonconsultationComponent } from './medical-history/components/reasonconsultation/reasonconsultation.component';
import { TreatmentPatientComponent } from './medical-history/pages/treatment-patient/treatment-patient.component';
import { MedicationFormComponent } from './medical-history/components/medication-form/medication-form.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCalendar } from '@angular/material/datepicker';

import { ButtonSendMessageComponent } from './communications/components/button-send-message/button-send-message.component';
import { DatepickerProfileColleagueComponent } from './communications/components/datepicker-profile-colleague/datepicker-profile-colleague.component';
import { HourpickerProfileColleagueComponent } from './communications/components/hourpicker-profile-colleague/hourpicker-profile-colleague.component';
import { SpaceAssignPatientComponent } from './communications/components/space-assign-patient/space-assign-patient.component';
import { ButtonSaveScheduleComponent } from './communications/components/button-save-schedule/button-save-schedule.component';
import { DoctorViewColleagueComponent } from './communications/components/doctor-view-colleague/doctor-view-colleague.component';
import { InfoProfileMedicalsComponent } from './profiles/components/info-profile-medicals/info-profile-medicals.component';

import { SelectPaymentMethodComponent } from "./subscriptions-and-payments/pages/select-payment-method/select-payment-method.component";
import { CardModalComponent } from './subscriptions-and-payments/components/card-modal/card-modal.component';

import { Role1Component } from './identity-and-access/components/role1/role1.component';
import { Role2Component } from './identity-and-access/components/role2/role2.component';

import { UserListComponent } from './communications/components/user-list/user-list.component';
import { ChatComponent } from './communications/components/chat-with-other-users/chat.component';
import { DoctorService } from './communications/services/doctor.service';
import { RouterLink } from "@angular/router";

import { MatNativeDateModule } from "@angular/material/core";
import { CalendarModule } from './calendar/calendar.module';
import { ProfilesModule } from './profiles/profiles.module';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SharedModule } from "./shared/shared.module";
import { AnnouncementPopupComponent } from "./notifications/components/announcement-popup/announcement-popup.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatPaginator} from "@angular/material/paginator";

// 🌐 Traducciones
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// ✅ Inicializa Sentry (ya se usó en main.ts, pero aquí se enlaza como ErrorHandler también)
@NgModule({
  declarations: [
    AppComponent,
    PatientsTableComponent,
    SearchDoctorsComponent,
    SearchPatiensComponent,
    PatientChatComponent,
    HomeDoctorComponent,
    DoctorRegistrationComponent,
    PatientsUploadExamComponent,
    BackgroundComponent,
    ClinicalhistoryComponent,
    ExternalreportsComponent,
    HeaderComponent,
    PatientdataComponent,
    DignosesandtreatmentComponent,
    ReasonconsultationComponent,
    MedicalexamsComponent,
    InfoProfileMedicalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbar,
    MatIcon,
    NgOptimizedImage,
    AnnouncementPopupComponent,
    MatSidenav,
    MatSidenavContainer,
    MatIconButton,
    MatSidenavContent,
    MatCardModule,
    MatButton,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    PatientsPendingTaskComponent,
    PatientsReminderComponent,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatButtonToggleGroup,
    MatButtonToggle,
    MatAnchor,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatPaginator,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatSort,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatCheckbox,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardContent,
    MatCardHeader,
    MatCardModule,
    MatGridList,
    MatGridTile,
    MatButton,
    DatepickerProfileColleagueComponent,
    HourpickerProfileColleagueComponent,
    SpaceAssignPatientComponent,
    ButtonSendMessageComponent,
    ButtonSaveScheduleComponent,
    DoctorViewColleagueComponent,
    RouterLink,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCalendar,
    AuthModule,
    CalendarModule,
    ProfilesModule,
    SharedModule,
    NgChartsModule,
    ChatComponent,
    DoctorChatComponent
  ],
  providers: [
    DoctorService,
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Router],
      multi: true,
    }
  ],
  exports: [
    PatientsReminderComponent,
    PatientsPendingTaskComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
