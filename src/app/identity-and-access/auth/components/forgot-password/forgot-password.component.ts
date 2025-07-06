import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatCard} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {LanguageSwitcherComponent} from "../../../../shared/components/language-switcher/language-switcher.component";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  imports: [
    TranslateModule,
    MatCard,
    ReactiveFormsModule,
    MatFormField,
    RouterLink,
    MatLabel,
    MatError,
    MatButton,
    MatInput,
    NgIf,
    LanguageSwitcherComponent
  ],
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
              private translate: TranslateService,){
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
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotForm.invalid) return;

    const email = this.forgotForm.get('email')?.value;
    console.log('Password reset request for:', email);

    alert('Instructions to reset your password have been sent to your email.');
    this.router.navigate(['/login']);
  }

  get emailControl() {
    return this.forgotForm.get('email');
  }
}
