import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {LanguageSwitcherComponent} from "../../../shared/components/language-switcher/language-switcher.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Doctor} from "../../../communications/model/doctor.models";
import {DoctorService} from "../../../communications/services/doctor.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-select-payment-method',
  templateUrl: './select-payment-method.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatCardActions,
    MatDivider,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCheckbox,
    MatToolbar,
    MatButton,
    LanguageSwitcherComponent,
    TranslateModule
  ],
  styleUrls: ['./select-payment-method.component.css']
})
export class SelectPaymentMethodComponent {
  doctor!: Doctor | undefined;
  constructor(private route: ActivatedRoute,
              private translate: TranslateService,
              private router: Router,
              private doctorService: DoctorService,) {
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
    const doctorId = Number(this.route.snapshot.paramMap.get('id'));
    this.doctor = this.doctorService.getDoctorById(doctorId);
  }
 goToHome(): void {
    this.router.navigate(['/homePatient']);
  }
}
