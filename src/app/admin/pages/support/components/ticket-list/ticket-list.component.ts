import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeStatusDialogComponent } from '../change-status-dialog/change-status-dialog.component';
import { ReplyDialogComponent } from '../reply-dialog/reply-dialog.component';
import { SupportTicket } from '../../model/support-ticket.model';
import { ChatService } from '../../../../../communications/services/chat.service';
import { Message } from '../../../../../communications/model/message';

import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatTooltip } from '@angular/material/tooltip';
import { DoctorProfile } from '../../../../../communications/model/doctor-profile';
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatTooltip,
    TranslateModule
  ],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class TicketListComponent implements OnInit, AfterViewInit {
  @Input() tickets: SupportTicket[] = [];
  displayedColumns: string[] = ['expand', 'id', 'createdAt', 'user', 'subject', 'priority', 'status'];
  dataSource = new MatTableDataSource<SupportTicket>();
  expandedTicket: SupportTicket | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;
  searchQuery = '';
  selectedPriority = '';
  selectedStatus = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private chatService: ChatService,
    private translate: TranslateService,
  ) {
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
    const storedStatuses = JSON.parse(localStorage.getItem('ticketStatuses') || '{}');
    const updatedTickets = this.tickets.map(ticket => {
      const updatedStatus = storedStatuses[ticket.id];
      return updatedStatus ? { ...ticket, status: updatedStatus } : ticket;
    });
    this.dataSource = new MatTableDataSource(updatedTickets);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  toggleRow(row: SupportTicket): void {
    this.expandedTicket = this.expandedTicket?.id === row.id ? null : row;
  }

  applyFilters(): void {
    this.dataSource.data = this.tickets.filter(ticket => {
      const matchesSearch =
        ticket.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        ticket.userName.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesPriority = this.selectedPriority ? ticket.priority === this.selectedPriority : true;
      const matchesStatus = this.selectedStatus ? ticket.status === this.selectedStatus : true;

      const ticketDate = new Date(ticket.createdAt);
      const matchesStartDate = this.startDate ? ticketDate >= this.startDate : true;
      const matchesEndDate = this.endDate ? ticketDate <= this.endDate : true;

      return matchesSearch && matchesPriority && matchesStatus && matchesStartDate && matchesEndDate;
    });

    const visibleIds = this.dataSource.data.map(t => t.id);
    if (this.expandedTicket && !visibleIds.includes(this.expandedTicket.id)) {
      this.expandedTicket = null;
    }

    this.dataSource.paginator?.firstPage();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedPriority = '';
    this.selectedStatus = '';
    this.startDate = null;
    this.endDate = null;
    this.applyFilters();
  }

  isExpansionDetailRow = (index: number, row: SupportTicket): boolean => row.hasOwnProperty('message');

  changeStatus(ticket: SupportTicket): void {
    const dialogRef = this.dialog.open(ChangeStatusDialogComponent, {
      width: '300px',
      data: { currentStatus: ticket.status }
    });

    dialogRef.afterClosed().subscribe(newStatus => {
      if (newStatus && newStatus !== ticket.status) {
        ticket.status = newStatus;
        this.dataSource.data = [...this.dataSource.data];
        const localStatuses = JSON.parse(localStorage.getItem('ticketStatuses') || '{}');
        localStatuses[ticket.id] = newStatus;
        localStorage.setItem('ticketStatuses', JSON.stringify(localStatuses));
      }
    });
  }

  exportVisibleTicketsToCSV(): void {
    const visibleTickets = this.dataSource.filteredData;
    const csvContent = [
      ['ID', 'Created At', 'User Name', 'User Role', 'Subject', 'Priority', 'Status'],
      ...visibleTickets.map(ticket => [
        ticket.id,
        new Date(ticket.createdAt).toLocaleString(),
        ticket.userName,
        ticket.userRole,
        `"${ticket.subject.replace(/"/g, '""')}"`,
        ticket.priority,
        ticket.status
      ])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tickets_export.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  openReplyDialog(ticket: SupportTicket): void {
    if (ticket.status === 'closed') {
      this.snackBar.open('Cannot reply to a closed ticket. Please create a new one.', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    const dialogRef = this.dialog.open(ReplyDialogComponent, {
      width: '400px',
      data: { ticketId: ticket.id, userName: ticket.userName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.message && ticket.userEmail) {
        const newMessage: Message = {
          id: Date.now(),
          sender: 'admin',
          receiverId: ticket.userEmail,
          from: 'admin@hormonalcare.com',
          to: ticket.userEmail,
          content: result.message,
          timestamp: new Date().toISOString()
        };

        this.chatService.sendMessage(newMessage).subscribe(() => {
          const [first, last] = ticket.userName.trim().split(' ');
          const profile: DoctorProfile = {
            id: Date.now(),
            name: first || '',
            lastname: last || '',
            email: ticket.userEmail,
            image: '',
            fee: 0,
            gender: '',
            title: '',
            college_number: '',
            RNE: '',
            undergraduate: '',
            specialty: '',
            sub_speciality: '',
            code_of_doctor: '',
            subscription_id: 0,
            password: '',
            role: ticket.userRole
          };

          this.chatService.addUserToLiveChat(profile);

          const key = `chat_${ticket.userEmail}`;
          const stored = localStorage.getItem(key);
          const history: Message[] = stored ? JSON.parse(stored) : [];
          history.push(newMessage);
          localStorage.setItem(key, JSON.stringify(history));

          if (ticket.status === 'open') {
            ticket.status = 'in_progress';
            const localStatuses = JSON.parse(localStorage.getItem('ticketStatuses') || '{}');
            localStatuses[ticket.id] = 'in_progress';
            localStorage.setItem('ticketStatuses', JSON.stringify(localStatuses));
            this.dataSource.data = [...this.dataSource.data];
          }

          this.snackBar.open('Reply sent and forwarded to Live Chat ✅', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          });
        });
      }
    });
  }

  getChipColor(type: 'priority' | 'status', value: string): string {
    const colorMap = {
      priority: { high: 'warn', medium: 'accent', low: 'primary' },
      status: { open: 'primary', in_progress: 'accent', resolved: 'warn', closed: 'warn' }
    };
    return colorMap[type][value] || '';
  }
}
