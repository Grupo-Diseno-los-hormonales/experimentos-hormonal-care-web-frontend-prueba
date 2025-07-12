import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HeaderDoctorComponent } from '../header-doctor/header-doctor.component';
import { LanguageSwitcherComponent } from '../../components/language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    HeaderDoctorComponent,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    LanguageSwitcherComponent
  ],
  exports: [
    HeaderDoctorComponent
  ]
})
export class HeaderModule {}
