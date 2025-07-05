import { Component, OnInit } from '@angular/core';
import { loadGapiInsideDOM } from 'gapi-script';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {TranslateService} from "@ngx-translate/core";

declare const gapi: any;

@Component({
  selector: 'app-calendar-patient-view',
  templateUrl: './calendar-patient-view.component.html',
  styleUrls: ['./calendar-patient-view.component.css']
})
export class CalendarPatientViewComponent implements OnInit {
  constructor(private translate: TranslateService,) {
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
  showAppointments = true;
  showMedication = true;
  calendarEvents: any[] = [];

  // FullCalendar setup
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  calendarOptions: any = {
    plugins: this.calendarPlugins,
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    events: [], // ← será actualizado luego
    height: 'auto'
  };

  // Google API
  private CLIENT_ID = '332639898486-td24voq7un5mbqe3o5sdna7e6vhcjr0m.apps.googleusercontent.com';
  private API_KEY = ''; // si no usas restricciones, déjalo vacío
  private DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  private SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

  async ngOnInit(): Promise<void> {
    await loadGapiInsideDOM();

    gapi.load('client:auth2', async () => {
      await gapi.client.init({
        apiKey: this.API_KEY,
        clientId: this.CLIENT_ID,
        discoveryDocs: this.DISCOVERY_DOCS,
        scope: this.SCOPES
      });

      const authInstance = gapi.auth2.getAuthInstance();

      if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
      }

      const response = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 20,
        orderBy: 'startTime'
      });

      this.calendarEvents = response.result.items;

      // 🔁 Convierte eventos al formato FullCalendar
      const formattedEvents = this.calendarEvents.map((event: any) => ({
        title: event.summary,
        start: event.start.dateTime || event.start.date,
        end: event.end?.dateTime || event.end?.date || null
      }));

      // 🔧 Asigna al calendario
      this.calendarOptions.events = formattedEvents;

      console.log('📅 Eventos cargados:', formattedEvents);
    });
  }

  toggleSection(section: 'appointments' | 'medication') {
    if (section === 'appointments') {
      this.showAppointments = !this.showAppointments;
    } else if (section === 'medication') {
      this.showMedication = !this.showMedication;
    }
  }
}
