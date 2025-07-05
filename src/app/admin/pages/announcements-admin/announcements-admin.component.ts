import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AnnouncementEntity } from '../../../notifications/model/announcement.entity';
import { AnnouncementService } from '../../../notifications/services/announcement.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-announcements-admin',
  templateUrl: './announcements-admin.component.html',
  styleUrls: ['./announcements-admin.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatInput,
    TranslateModule
  ]
})
export class AnnouncementsAdminComponent implements OnInit {
  announcementForm!: FormGroup;
  announcements: AnnouncementEntity[] = [];

  constructor(
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
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
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      message: ['', Validators.required],
      audience: ['doctors', Validators.required]
    });

    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcements = this.announcementService.getAll();
  }

  submit(): void {
    if (this.announcementForm.valid) {
      const { title, description, message, audience } = this.announcementForm.value;
      const createdAt = new Date().toISOString();

      const newAnnouncement: AnnouncementEntity = {
        id: crypto.randomUUID(),
        title,
        description,
        message,
        audience, // puede ser 'patients', 'doctors' o 'all'
        createdAt
      };

      this.announcementService.create(newAnnouncement);
      this.announcementForm.reset({ audience: 'doctors' });
      this.loadAnnouncements();
    }
  }


}
