import { Component, OnInit } from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";

interface ChatMessage {
  text?: string;
  sender: 'patient' | 'doctor';
  timestamp: Date;
  file?: {
    name: string;
    url: string;
    type?: string;
  };
}

@Component({
  selector: 'app-doctor-chat',
  standalone: true,
  templateUrl: './doctor-chat.component.html',
  styleUrls: ['./doctor-chat.component.css'],
  imports: [
    NgForOf,
    TranslateModule,
    NgClass,
    NgIf,
    FormsModule,
    MatIcon
  ]
})
export class DoctorChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  uploadedFiles: { name: string; url: string; type?: string }[] = [];

  constructor(private translate: TranslateService) {

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
    const saved = localStorage.getItem('single_chat');
    if (saved) {
      this.messages = JSON.parse(saved);
    }
  }

  sendMessage(): void {
    const trimmed = this.newMessage.trim();
    if (trimmed.length > 0) {
      this.messages.push({
        text: trimmed,
        sender: 'doctor',
        timestamp: new Date()
      });
      this.newMessage = '';
    }

    this.uploadedFiles.forEach(file => {
      this.messages.push({
        sender: 'doctor',
        timestamp: new Date(),
        file: {
          name: file.name,
          url: file.url,
          type: file.type
        }
      });
    });

    this.uploadedFiles = [];
    this.saveMessages();
  }

  handleFileUpload(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedFiles.push({
            name: file.name,
            url: e.target.result,
            type: file.type
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  saveMessages(): void {
    localStorage.setItem('single_chat', JSON.stringify(this.messages));
  }

  clearChat(): void {
    this.messages = [];
    this.saveMessages();
  }

  protected readonly localStorage = localStorage;
}
