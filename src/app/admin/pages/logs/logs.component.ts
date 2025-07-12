import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartData } from 'chart.js';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

interface ExtendedLogEntry {
  timestamp: string;
  user: string;
  eventType: string;
  ipAddress: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  location?: string;
  device?: string;
  actionId?: string;
}

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    NgChartsModule,
    MatIcon,
    TranslateModule
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements AfterViewInit {
  displayedColumns: string[] = ['expand','timestamp', 'user', 'eventType', 'ipAddress', 'riskLevel'];
  dataSource = new MatTableDataSource<ExtendedLogEntry>([]);
  selectedRiskLevel: 'All' | 'Low' | 'Medium' | 'High' = 'All';
  groupBy: 'none' | 'user' | 'eventType' = 'none';
  searchText: string = '';
  allLogs: ExtendedLogEntry[] = [];
  expandedElement: ExtendedLogEntry | null = null;
  isGroupRow = (index: number, row: ExtendedLogEntry) => row.actionId?.startsWith('group-');
  isDataRow = (index: number, row: ExtendedLogEntry) => !row.actionId?.startsWith('group-');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336']
      }
    ]
  };
  pieChartType: ChartType = 'pie';

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Events',
        data: [],
        backgroundColor: '#673ab7'
      }
    ]
  };

  barChartType: ChartType = 'bar';

  constructor(private snackBar: MatSnackBar, private translate: TranslateService,) {
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);

  }
    selectedLang = localStorage.getItem('lang') || 'es';

    changeLang(lang: string): void {
      this.translate.use(lang);
      localStorage.setItem('lang', lang);
      this.selectedLang = lang;

    this.loadMockLogs();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadMockLogs() {
    this.allLogs = [
      {
        timestamp: '2025-06-13 22:14',
        user: 'admin@hormonalcare.com',
        eventType: 'Login Success',
        ipAddress: '192.168.0.12',
        riskLevel: 'Low',
        location: 'Lima, Perú',
        device: 'Chrome on Windows 10',
        actionId: 'evt-0001'
      },
      {
        timestamp: '2025-06-13 22:20',
        user: 'ana.romero@hormonalcare.com',
        eventType: 'Failed Password Attempt',
        ipAddress: '192.168.0.42',
        riskLevel: 'Medium',
        location: 'Arequipa, Perú',
        device: 'Firefox on Linux',
        actionId: 'evt-0002'
      },
      {
        timestamp: '2025-06-13 23:01',
        user: 'admin@hormonalcare.com',
        eventType: 'User Deletion',
        ipAddress: '10.0.0.1',
        riskLevel: 'High',
        location: 'Trujillo, Perú',
        device: 'Safari on macOS',
        actionId: 'evt-0003'
      }
    ];
    this.applyCombinedFilter();
  }

  applyCombinedFilter() {
    const filterText = this.searchText.trim().toLowerCase();

    const filtered = this.allLogs.filter(log => {
      const matchesText =
        log.user.toLowerCase().includes(filterText) ||
        log.ipAddress.includes(filterText) ||
        log.eventType.toLowerCase().includes(filterText);

      const matchesRisk =
        this.selectedRiskLevel === 'All' || log.riskLevel === this.selectedRiskLevel;

      return matchesText && matchesRisk;
    });

    if (this.groupBy !== 'none') {
      const grouped = new Map<string, ExtendedLogEntry[]>();
      for (const log of filtered) {
        const key = log[this.groupBy];
        if (!grouped.has(key)) grouped.set(key, []);
        grouped.get(key)!.push(log);
      }

      const groupedData: ExtendedLogEntry[] = [];
      for (const [key, group] of grouped) {
        groupedData.push({
          timestamp: '',
          user: '',
          eventType: '',
          ipAddress: '',
          riskLevel: 'Low',
          location: '',
          device: '',
          actionId: `group-${key}`
        });
        groupedData.push(...group);
      }

      this.dataSource.data = groupedData;
      console.log("Grouped data:", groupedData);
    } else {
      this.dataSource.data = filtered;
    }

    this.updatePieChartData(filtered); // 👈 Esto es clave para mantener todo sincronizado
  }

  updatePieChartData(filteredLogs: ExtendedLogEntry[]) {
    const riskCounts = { Low: 0, Medium: 0, High: 0 };
    const eventCounts: Record<string, number> = {};

    for (const log of filteredLogs) {
      if (log.riskLevel in riskCounts) riskCounts[log.riskLevel]++;
      eventCounts[log.eventType] = (eventCounts[log.eventType] || 0) + 1;
    }

    this.pieChartData = {
      labels: ['Low', 'Medium', 'High'],
      datasets: [{
        data: [riskCounts.Low, riskCounts.Medium, riskCounts.High],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336']
      }]
    };

    this.barChartData = {
      labels: Object.keys(eventCounts),
      datasets: [{
        label: 'Events',
        data: Object.values(eventCounts),
        backgroundColor: '#673ab7'
      }]
    };
  }

  refreshLogs() {
    this.loadMockLogs();
    this.snackBar.open(
      this.translate.instant('ADMIN_LOGS.SNACKBAR.REFRESH_SUCCESS'),
      this.translate.instant('COMMON.CLOSE'),
      { duration: 3000, verticalPosition: 'top' }
    );

  }

  toggleRow(log: ExtendedLogEntry) {
    this.expandedElement =
      this.expandedElement?.actionId === log.actionId ? null : log;
  }

  exportLogs() {
    const logs = this.dataSource.data;
    if (!logs.length) {
      this.snackBar.open(
        this.translate.instant('ADMIN_LOGS.SNACKBAR.NO_DATA'),
        this.translate.instant('COMMON.CLOSE'),
        { duration: 3000, verticalPosition: 'top' }
      );      return;
    }

    const headers = ['Timestamp', 'User', 'Event Type', 'IP Address', 'Risk Level', 'Location', 'Device', 'Action ID'];
    const csvRows = [
      headers.join(','),
      ...logs
        .filter(log => !log.actionId?.startsWith('group-')) // omitimos los headers de agrupación
        .map(log => [
          log.timestamp,
          `"${log.user}"`,
          `"${log.eventType}"`,
          log.ipAddress,
          log.riskLevel,
          `"${log.location || ''}"`,
          `"${log.device || ''}"`,
          log.actionId || ''
        ].map(field => field.toString().replace(/"/g, '""')).join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'logs_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    this.snackBar.open(
      this.translate.instant('ADMIN_LOGS.SNACKBAR.EXPORT_SUCCESS'),
      this.translate.instant('COMMON.CLOSE'),
      { duration: 3000, verticalPosition: 'top' }
    );  }
}
