import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import {DarkModeService} from "../../../shared/services/dark-mode.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [NgChartsModule, RouterLink, MatIcon, RouterLinkActive, TranslateModule]
})
export class AdminDashboardComponent implements OnInit {

  isDarkMode = false;



  @ViewChild('lineChart') lineChart!: BaseChartDirective;
  @ViewChild('stackedChart') stackedChart!: BaseChartDirective;
  @ViewChild('pieChart') pieChart!: BaseChartDirective;
  @ViewChild('barChart') barChart!: BaseChartDirective;

  constructor(private darkModeService: DarkModeService, private router: Router, private translate: TranslateService,) {
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
  goTo(route: string): void {
    this.router.navigate([`/admin/${route}`]);
  }
  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe(mode => {
      this.isDarkMode = mode;
    });
  }





  cards = [
    { title: 'Enviar Comunicados', description: 'Envía comunicados a médicos y pacientes', icon: 'campaign', route: 'announcementsAdmin' },
    { title: 'Reasignar Pacientes', description: 'Reasigna pacientes a otros médicos', icon: 'sync_alt', route: 'reassignPatient' },
    { title: 'Revisar Logs de Acceso', description: 'Visualiza accesos sospechosos', icon: 'security', route: 'logs' },
    { title: 'Soporte Técnico', description: 'Gestiona mensajes de soporte', icon: 'support_agent', route: 'support' },
    { title: 'Gestión de Usuarios', description: 'Visualiza y administra usuarios registrados', icon: 'group', route: 'user-management' }
  ];


}
