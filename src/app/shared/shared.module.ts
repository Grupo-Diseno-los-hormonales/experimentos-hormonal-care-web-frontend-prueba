import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {
  MatDialogModule,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';

// Componentes compartidos
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { FooterContentComponent } from '../public/components/footer-content/footer-content.component';
import { HeaderForUserTypeServiceComponent } from './components/header-for-user-type-service/header-for-user-type-service.component';
import { PrivacyDialogComponent } from './components/privacy-dialog/privacy-dialog.component';
import { TermsDialogComponent } from './components/terms-dialog/terms-dialog.component';
import { PrivacyPolicyPersonalDataProcessingComponent } from './components/privacy-policy-personal-data-processing/privacy-policy-personal-data-processing.component';

import { HeaderAdminComponent } from './pages/header-admin/header-admin.component';
import { HeaderDoctorComponent } from './pages/header-doctor/header-doctor.component';
import { HeaderPatientComponent } from './pages/header-patient/header-patient.component';
import { ColleagueSearchComponent } from '../communications/pages/colleague-search/colleague-search.component';
import {HeaderModule} from "./pages/header/header.module";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    FooterContentComponent,
    HeaderForUserTypeServiceComponent,
    TermsDialogComponent,
    PrivacyPolicyPersonalDataProcessingComponent,
    PrivacyDialogComponent,
    HeaderAdminComponent,
    HeaderPatientComponent,
    ColleagueSearchComponent,
    HeaderModule
  ],
  exports: [
    CommonModule,
    FooterContentComponent,
    HeaderForUserTypeServiceComponent,
    PrivacyDialogComponent,
    TermsDialogComponent,
    PrivacyPolicyPersonalDataProcessingComponent,
    HeaderAdminComponent,
    HeaderPatientComponent,
    ColleagueSearchComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule
  ]
})
export class SharedModule {}
