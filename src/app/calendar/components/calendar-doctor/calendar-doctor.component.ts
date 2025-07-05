import {
  Component,
  signal,
  ChangeDetectorRef,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { EventCalendarService } from '../../services/event-calendar.service';
import { Subscription } from 'rxjs';
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-calendar-doctor',
  templateUrl: './calendar-doctor.component.html',
  styleUrl: './calendar-doctor.component.css',
  imports: [CommonModule, RouterOutlet, FullCalendarModule, TranslateModule],
  standalone: true
})
export class CalendarDoctorComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('calendar') calendarComponent: any;

  private subscription: Subscription = new Subscription();

  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  });

  currentEvents = signal<EventApi[]>([]);

  constructor(
    private changeDetector: ChangeDetectorRef,
    private eventCalendarService: EventCalendarService,
    private translate: TranslateService) {
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
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.subscription = this.eventCalendarService.events$.subscribe(events => {
      const calendarApi = this.calendarComponent?.getApi();
      if (calendarApi) {
        calendarApi.removeAllEvents();
        events.forEach(event => {
          calendarApi.addEvent({
            id: createEventId(),
            title: event.title,
            start: event.start,
            end: event.end,
            allDay: event.allDay ?? false
          });
        });
        this.changeDetector.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }

  handleEventsFromDOM(event: any) {
    const detail = event?.detail || event;
    this.handleEvents(detail);
  }
}
