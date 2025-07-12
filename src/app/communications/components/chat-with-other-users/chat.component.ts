import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../model/message';
import { DoctorProfile } from '../../model/doctor-profile';
import {FormsModule} from "@angular/forms";
import {DatePipe, NgClass} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {DarkModeService} from "../../../shared/services/dark-mode.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    NgClass,
    CommonModule,
    TranslateModule
  ],
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnChanges {
isDarkMode = false;
  @Input() currentUserEmail: string = '';
  @Input() selectedUserEmail: string = '';

  currentUser: DoctorProfile | null = null;
  selectedUser: DoctorProfile | null = null;
  messages: Message[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService, private translate: TranslateService, private darkModeService: DarkModeService, private translateService: TranslateService)
    {
      const lang = localStorage.getItem('lang') || 'es';
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
this.isDarkMode=this.darkModeService.current;
    }
    selectedLang = localStorage.getItem('lang') || 'es';

    changeLang(lang: string): void {
      this.translate.use(lang);
      localStorage.setItem('lang', lang);
      this.selectedLang = lang;

  }
  toggleDarkMode(): void {
    this.darkModeService.toggle();
    this.isDarkMode = this.darkModeService.current;
  }
  ngOnInit() {
    this.loadUsersAndMessages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentUserEmail'] || changes['selectedUserEmail']) {
      this.loadUsersAndMessages();
    }
  }

  loadUsersAndMessages() {
    if (this.currentUserEmail && this.selectedUserEmail) {
      this.chatService.getDoctorByEmail(this.currentUserEmail).subscribe(
        currentUser => {
          this.currentUser = currentUser;
        }
      );
      this.chatService.getDoctorByEmail(this.selectedUserEmail).subscribe(
        selectedUser => {
          this.selectedUser = selectedUser;
          this.getMessages();
        }
      );
    }
  }

  getMessages() {
    if (this.currentUser && this.selectedUser) {
      this.chatService.getMessages(this.currentUser.email, this.selectedUser.email).subscribe(
        messages => this.messages = messages
      );
    }
  }

  sendMessage() {
    if (this.newMessage.trim() !== '' && this.currentUser && this.selectedUser) {
      const message: Message = {
        id: 0,
        sender: this.currentUserEmail === 'admin@hormonalcare.com' ? 'admin' : 'user',
        receiverId: this.selectedUser.email,
        from: this.currentUser.email,
        to: this.selectedUser.email,
        content: this.newMessage,
        timestamp: new Date().toISOString()
      };
      this.chatService.sendMessage(message).subscribe(
        sentMessage => {
          this.messages.push(sentMessage);
          this.newMessage = '';
        }
      );
    }
  }
}
