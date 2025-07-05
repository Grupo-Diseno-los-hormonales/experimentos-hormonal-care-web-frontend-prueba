import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './support-settings.component.html',
  styleUrls: ['./support-settings.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class SupportSettingsComponent {
  readonly storageKey = 'supportSettings';

  settings = {
    notifications: {
      email: true,
      push: false
    },
    supportHours: {
      start: '09:00',
      end: '18:00'
    },
    testMode: false,
    style: {
      backgroundColor: '#f3e5f5',
      textColor: '#333333'
    }
  };
constructor(private http: HttpClient, private translate: TranslateService) {
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
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.settings = JSON.parse(saved);
    }
  }

  onChange(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
  }

  resetSettings(): void {
    localStorage.removeItem(this.storageKey);
    this.settings = {
      notifications: {
        email: true,
        push: false
      },
      supportHours: {
        start: '09:00',
        end: '18:00'
      },
      testMode: false,
      style: {
        backgroundColor: '#f3e5f5',
        textColor: '#333333'
      }
    };
  }

  exportData(format: 'csv' | 'pdf') {
    const usuario = 'Admin User'; // Este valor puede venir de un servicio de autenticación
    const fecha = new Date().toLocaleString('es-PE');
    const appVersion = '1.0.0';
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;

    const data: [string, string][] = [
      ['Notificaciones Email', this.settings.notifications.email ? 'Sí' : 'No'],
      ['Notificaciones Push', this.settings.notifications.push ? 'Sí' : 'No'],
      ['Inicio Atención', this.settings.supportHours.start],
      ['Fin Atención', this.settings.supportHours.end],
      ['Modo Prueba', this.settings.testMode ? 'Sí' : 'No'],
      ['Color Fondo', this.settings.style.backgroundColor],
      ['Color Texto', this.settings.style.textColor],
      ['Versión de la App', appVersion],
      ['Sistema Operativo', platform],
      ['Navegador', userAgent]
    ];

    if (format === 'pdf') {
      this.generatePDF(data, usuario, fecha);
    } else if (format === 'csv') {
      const csv = this.generateCSV(data);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'configuracion_soporte.csv');
    }
  }

  private generatePDF(data: [string, string][], usuario: string, fecha: string): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Configuración de Soporte - HormonalCare', 20, 20);

    doc.setFontSize(12);
    doc.text(`Usuario: ${usuario}`, 20, 30);
    doc.text(`Fecha de exportación: ${fecha}`, 20, 38);

    autoTable(doc, {
      startY: 45,
      head: [['Parámetro', 'Valor']],
      body: data
    });

    doc.save('configuracion_soporte.pdf');
  }

  private generateCSV(data: [string, string][]): string {
    const headers = ['Parámetro', 'Valor'];
    const rows = data.map(row => row.map(this.escapeCSV).join(','));
    return [headers.join(','), ...rows].join('\r\n');
  }

  private escapeCSV(value: string): string {
    if (value.includes(',') || value.includes('"')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }
}
