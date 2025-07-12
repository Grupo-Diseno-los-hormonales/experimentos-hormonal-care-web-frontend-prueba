import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserTypeService } from '../../../../shared/services/user-type.service';
import { PrivacyDialogComponent } from '../../../../shared/components/privacy-dialog/privacy-dialog.component';
import { TermsDialogComponent } from '../../../../shared/components/terms-dialog/terms-dialog.component';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {LanguageSwitcherComponent} from "../../../../shared/components/language-switcher/language-switcher.component";
import {MatCard} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {RecaptchaFormsModule, RecaptchaModule} from "ng-recaptcha";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {DarkModeService} from "../../../../shared/services/dark-mode.service";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [
    TranslateModule,
    LanguageSwitcherComponent,
    RouterLink,
    MatCard,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatCheckbox,
    MatError,
    RecaptchaFormsModule,
    RecaptchaModule,
    MatButton,
    NgIf,
    MatIconButton,
    MatIcon,
    MatTooltip
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isDarkMode = false;
  registerForm!: FormGroup;
  userType: string | null = null;
  recaptchaToken: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userTypeService: UserTypeService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private darkModeService: DarkModeService,
  ) {
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.isDarkMode = this.darkModeService.current;
  }
  selectedLang = localStorage.getItem('lang') || 'es';

  changeLang(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.selectedLang = lang;
  }

  ngOnInit(): void {
    this.userType = this.userTypeService.getUserType();

    if (!this.userType) {
      this.router.navigate(['/selectRole']);
      return;
    }

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      acceptPolicies: [false, Validators.requiredTrue],
      recaptcha: ['', Validators.required]
    });
    if (this.darkModeService.current) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

  }

  onCaptchaResolved(token: string): void {
    this.recaptchaToken = token;
    this.registerForm.get('recaptcha')?.setValue(token);
    console.log('reCAPTCHA token:', token);
  }

  onSubmit(): void {
    if (this.registerForm.invalid || !this.userType || !this.recaptchaToken) return;

    console.log('Usuario registrado:', this.registerForm.value);
    console.log('Rol:', this.userType);
    console.log('reCAPTCHA:', this.recaptchaToken);

    if (this.userType === 'patient') {
      this.router.navigate(['/homePatient']);
    } else if (this.userType === 'endocrinologist') {
      this.router.navigate(['/homeDoctor']);
    } else if (this.userType === 'admin') {
      this.router.navigate(['/admin']).then();
    }
  }

  openPrivacyDialog(event: Event): void {
    event.preventDefault();
    this.dialog.open(PrivacyDialogComponent);
  }

  openTermsDialog(event: Event): void {
    event.preventDefault();
    this.dialog.open(TermsDialogComponent);
  }

  ngAfterViewInit(): void {
    const dark = localStorage.getItem('dark-mode') === 'true';
    this.isDarkMode = dark;
    document.body.classList.toggle('dark-mode', dark);
  }

  toggleDarkMode(): void {
    this.darkModeService.toggle();
    this.isDarkMode = this.darkModeService.current;
  }


}
