import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SelectUserRoleComponent } from '../pages/select-user-role/select-user-role.component';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

// reCAPTCHA
import { RecaptchaModule } from 'ng-recaptcha';
import {TranslateModule} from "@ngx-translate/core";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    RegisterComponent,
    ForgotPasswordComponent,
    SelectUserRoleComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,

        // Angular Material
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatCheckboxModule,
        MatButtonModule,
      MatSelectModule,
      MatOptionModule,
      SharedModule,
      LoginComponent,

        // reCAPTCHA
        RecaptchaModule,
        TranslateModule,
    ],
  exports: [
    RegisterComponent,
    ForgotPasswordComponent,
    SelectUserRoleComponent
  ],
})
export class AuthModule {}
