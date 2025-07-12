import {Component, ViewChild} from '@angular/core';
import {
  ChartConfiguration,
  ChartData,
  ChartOptions, ChartType
} from 'chart.js';
import {BaseChartDirective, NgChartsModule} from "ng2-charts";
import {DarkModeService} from "../../../shared/services/dark-mode.service";
import {Router} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    NgChartsModule,
    MatIconModule,
    TranslateModule,
  ]
})
export class AdminStatsComponent {
  isDarkMode = false;

  @ViewChild('lineChart') lineChart!: BaseChartDirective;
  @ViewChild('stackedChart') stackedChart!: BaseChartDirective;
  @ViewChild('pieChart') pieChart!: BaseChartDirective;
  @ViewChild('barChart') barChart!: BaseChartDirective;

  constructor(private darkModeService: DarkModeService, private router: Router, private translate: TranslateService,){
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
      this.applyChartTheme();
    });
  }


  private refreshCharts(): void {
    setTimeout(() => {
      this.lineChart?.update();
      this.stackedChart?.update();
      this.pieChart?.update();
      this.barChart?.update();
    }, 100);
  }

  private applyChartTheme(): void {
    const legendColor = this.isDarkMode ? '#ffffff' : '#333333';
    const ticksColor = this.isDarkMode ? '#ffffff' : '#555555';

    this.lineChartOptions = {
      responsive: true,
      plugins: {
        legend: { position: 'top', labels: { color: legendColor } }
      },
      scales: {
        x: { ticks: { color: ticksColor } },
        y: { beginAtZero: true, ticks: { color: ticksColor } }
      }
    };

    this.stackedBarOptions = {
      responsive: true,
      plugins: {
        legend: { position: 'top', labels: { color: legendColor } }
      },
      scales: {
        x: { stacked: true, ticks: { color: ticksColor } },
        y: { stacked: true, beginAtZero: true, ticks: { color: ticksColor } }
      }
    };

    this.pieChartOptions = {
      responsive: true,
      plugins: {
        legend: { position: 'top', labels: { color: legendColor } }
      }
    };

    this.barChartOptions = {
      responsive: true,
      plugins: {
        legend: { labels: { color: legendColor } }
      },
      scales: {
        x: { ticks: { color: ticksColor } },
        y: { beginAtZero: true, ticks: { color: ticksColor } }
      }
    };

    // Aplicar también a gráficos independientes
    this.monthlyActivityOptions.plugins!.legend!.labels = { color: legendColor };
    this.monthlyActivityOptions.scales = {
      x: { ticks: { color: ticksColor } },
      y: { beginAtZero: true, ticks: { color: ticksColor } }
    };

    this.ticketCategoryOptions.plugins!.legend!.labels = { color: legendColor };
    this.ticketCategoryOptions.scales = {
      y: { beginAtZero: true, ticks: { color: ticksColor } }
    };

    this.responseTimeOptions.plugins!.legend!.labels = { color: legendColor };
    this.responseTimeOptions.scales = {
      y: { beginAtZero: true, ticks: { color: ticksColor } },
      x: { ticks: { color: ticksColor } }
    };

    this.userRolesOptions.plugins!.legend!.labels = { color: legendColor };

    this.refreshCharts();
  }


  cards = [
    { title: 'Enviar Comunicados', description: 'Envía comunicados a médicos y pacientes', icon: 'campaign', route: 'announcements' },
    { title: 'Reasignar Pacientes', description: 'Reasigna pacientes a otros médicos', icon: 'sync_alt', route: 'reassign' },
    { title: 'Revisar Logs de Acceso', description: 'Visualiza accesos sospechosos', icon: 'security', route: 'logs' },
    { title: 'Soporte Técnico', description: 'Gestiona mensajes de soporte', icon: 'support_agent', route: 'support' },
    { title: 'Gestión de Usuarios', description: 'Visualiza y administra usuarios registrados', icon: 'group', route: 'user-management' }
  ];

  // === Charts ===

  public lineChartLabels: string[] = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
  public lineChartData = [
    {
      data: [50, 65, 70, 80],
      label: 'Consultas',
      fill: true,
      tension: 0.4,
      borderColor: '#42A5F5',
      backgroundColor: 'rgba(66,165,245,0.2)',
      pointBackgroundColor: '#42A5F5'
    },
    {
      data: [40, 45, 60, 72],
      label: 'Seguimientos',
      fill: true,
      tension: 0.4,
      borderColor: '#66BB6A',
      backgroundColor: 'rgba(102,187,106,0.2)',
      pointBackgroundColor: '#66BB6A'
    }
  ];
  public lineChartOptions: any;

  public stackedBarLabels: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  public stackedBarData = [
    { label: 'INFO', data: [30, 25, 35, 40, 32], backgroundColor: '#64b5f6' },
    { label: 'WARN', data: [12, 14, 9, 10, 8], backgroundColor: '#ffb74d' },
    { label: 'ERROR', data: [4, 2, 6, 3, 1], backgroundColor: '#e57373' }
  ];
  public stackedBarOptions: any;

  public barChartData: ChartData<'bar'> = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    datasets: [
      { data: [35, 49, 32, 50, 40], label: 'Pacientes' },
      { data: [20, 34, 27, 44, 30], label: 'Seguimientos' }
    ]
  };
  public barChartOptions: any;

  public pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Search Engines', 'Direct Click', 'Referral'],
    datasets: [{ data: [30, 30, 40] }]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: any;

  // BAR: Monthly Activity Comparison
  monthlyActivityData: ChartData<'bar'> = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Logins',
        data: [120, 190, 300, 250],
        backgroundColor: '#42a5f5'
      },
      {
        label: 'Announcements',
        data: [80, 160, 200, 180],
        backgroundColor: '#9ccc65'
      }
    ]
  };

  monthlyActivityOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  // PIE: User Role Distribution
  userRolesData: ChartData<'pie'> = {
    labels: ['Admins', 'Doctors', 'Patients'],
    datasets: [
      {
        label: 'Users',
        data: [5, 50, 300],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
      }
    ]
  };

  userRolesOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  // LINE: Response Time Trends
  responseTimeData: ChartData<'line'> = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Avg Response Time (mins)',
        data: [12, 15, 10, 18],
        fill: false,
        tension: 0.3,
        borderColor: '#673ab7',
        backgroundColor: '#b39ddb'
      }
    ]
  };

  responseTimeOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // BAR: Support Tickets by Category
  ticketCategoryData: ChartData<'bar'> = {
    labels: ['Login Issues', 'Appointments', 'Prescriptions', 'Other'],
    datasets: [
      {
        label: 'Tickets',
        data: [15, 22, 9, 5],
        backgroundColor: '#ff7043'
      }
    ]
  };

  ticketCategoryOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
}
