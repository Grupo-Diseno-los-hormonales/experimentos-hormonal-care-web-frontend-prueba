import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  templateUrl: './language-switcher.component.html',
  imports: [
    MatMenu,
    MatMenuItem,
    MatIcon,
    MatMenuTrigger,
    MatIconButton,
    NgForOf
  ],
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcherComponent implements OnInit {
  languages = ['en', 'es'];
  currentLang = this.translate.currentLang || localStorage.getItem('lang') || 'es';

  constructor(private translate: TranslateService) {
    // Usar el idioma almacenado al iniciar
    const storedLang = localStorage.getItem('lang');
    if (storedLang) {
      this.translate.use(storedLang);
    }
  }

  ngOnInit(): void {
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.translate.use(this.currentLang);
  }

  useLanguage(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  getFlag(lang: string): string {
    switch (lang) {
      case 'en': return '🇺🇸';
      case 'es': return '🇪🇸';
      default: return '🌐';
    }
  }
}
