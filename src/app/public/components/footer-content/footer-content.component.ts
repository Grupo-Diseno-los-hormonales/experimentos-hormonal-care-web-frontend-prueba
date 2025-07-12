import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrivacyDialogComponent } from '../../../shared/components/privacy-dialog/privacy-dialog.component';
import { TermsDialogComponent } from '../../../shared/components/terms-dialog/terms-dialog.component';
import {
  PrivacyPolicyPersonalDataProcessingComponent
} from "../../../shared/components/privacy-policy-personal-data-processing/privacy-policy-personal-data-processing.component";
import {HelpDialogComponent} from "../../../shared/components/help-dialog/help-dialog.component";
import {DarkModeService} from "../../../shared/services/dark-mode.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-footer-content',
  templateUrl: './footer-content.component.html',
  styleUrls: ['./footer-content.component.css'],
  imports: [
    TranslateModule
  ],
  standalone: true
})
export class FooterContentComponent implements OnInit {
  isDarkMode= false;
  constructor(
    private dialog: MatDialog,
    private darkModeService: DarkModeService, private translate: TranslateService,) {



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
    this.darkModeService.darkMode$.subscribe(mode => {
      this.isDarkMode = mode;
    });

    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      this.darkModeService.setDarkMode(true);
    }
  }
  toggleDarkMode(): void {
    const newMode = !this.isDarkMode;
    this.darkModeService.setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
  }
  openPrivacyDialog(): void {
    this.dialog.open(PrivacyDialogComponent);
  }

  openTermsDialog(): void {
    this.dialog.open(TermsDialogComponent);
  }

  openPrivacyPolicyPersonalDataProcessing(): void {
    this.dialog.open(PrivacyPolicyPersonalDataProcessingComponent);
  }
  openHelp(): void {
    this.dialog.open(HelpDialogComponent);
  }
}
