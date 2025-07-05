import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeService } from '../../../shared/services/user-type.service';
import {TranslateService} from "@ngx-translate/core";

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
  selector: 'app-patient-chat',
  templateUrl: './patient-chat.component.html',
  styleUrls: ['./patient-chat.component.css']
})
export class PatientChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  uploadedFiles: { name: string; url: string; type?: string }[] = [];

  constructor(
    private userTypeService: UserTypeService,
    private router: Router,
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
    const userType = this.userTypeService.getUserType();
    if (userType !== 'patient') {
      this.router.navigate(['/login'], { replaceUrl: true });
    }

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
        sender: 'patient',
        timestamp: new Date()
      });
      this.newMessage = '';
    }

    this.uploadedFiles.forEach(file => {
      this.messages.push({
        sender: 'patient',
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
}
