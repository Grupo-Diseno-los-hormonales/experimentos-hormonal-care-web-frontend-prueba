import { Component } from '@angular/core';
import {CalendarDoctorComponent} from "../../components/calendar-doctor/calendar-doctor.component";
import {CalendarModule} from "../../calendar.module";
import {TranslateService} from "@ngx-translate/core";
import {DarkModeService} from "../../../shared/services/dark-mode.service";
import {AddEventCardComponent} from "../../components/add-event-card/add-event-card.component";

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  templateUrl: './calendar-view.component.html',
  imports: [
    CalendarDoctorComponent,
    AddEventCardComponent
  ],
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent {
  constructor(private translate: TranslateService, private darkModeService: DarkModeService) {
    this.applyDarkModeClass();
  }

  applyDarkModeClass(): void {
    const isDark = this.darkModeService.current;
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  toggleDarkMode(): void {
    this.darkModeService.toggle();
    this.applyDarkModeClass();
  }
}

