import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleCalendarService } from '../../services/google-calendar-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventCalendarService, CalendarEvent } from '../../services/event-calendar.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-add-event-card',
  templateUrl: './add-event-card.component.html',
  styleUrls: ['./add-event-card.component.css']
})
export class AddEventCardComponent implements OnInit {
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private googleCalendarService: GoogleCalendarService,
    private snackBar: MatSnackBar,
    private eventCalendarService: EventCalendarService,
    private translate: TranslateService,
  ) {

    this.eventForm = this.fb.group({
      eventDate: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      patientEmail: ['', [Validators.required, Validators.email]],
      title: ['', Validators.required],
    });
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

  createEvent() {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;

      const startDateTime = new Date(formValue.eventDate);
      const [startHours, startMinutes] = formValue.startTime.split(':');
      startDateTime.setHours(startHours, startMinutes);

      const endDateTime = new Date(formValue.eventDate);
      const [endHours, endMinutes] = formValue.endTime.split(':');
      endDateTime.setHours(endHours, endMinutes);

      const localEvent: CalendarEvent = {
        title: formValue.title,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        allDay: false
      };

      // ✅ Agrega el evento localmente (Frontend)
      this.eventCalendarService.addEvent(localEvent);

      // ❌ Comentado: Integración real con Google Calendar API
      // TODO: Descomentar esto cuando el backend y autenticación OAuth estén listos
      /*
      const eventDetails = {
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        email: formValue.patientEmail,
        summary: formValue.title,
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
      };

      this.googleCalendarService.createGoogleEvent(eventDetails).then(() => {
        this.snackBar.open('Event created', '', {
          duration: 4000,
        });
        this.eventForm.reset();
      }).catch((error) => {
        console.error('Error creating event', error);
      });
      */

      // ✅ Feedback básico sin usar Google API
      this.snackBar.open('Local event created', '', {
        duration: 3000,
      });
      this.eventForm.reset();

    } else {
      console.error('Form is not valid');
    }
  }

}
