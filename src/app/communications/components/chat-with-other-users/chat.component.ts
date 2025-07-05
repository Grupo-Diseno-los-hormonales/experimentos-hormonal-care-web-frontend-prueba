import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../model/message';
import { DoctorProfile } from '../../model/doctor-profile';
import {FormsModule} from "@angular/forms";
import {DatePipe, NgClass} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

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

  @Input() currentUserEmail: string = '';
  @Input() selectedUserEmail: string = '';

  currentUser: DoctorProfile | null = null;
  selectedUser: DoctorProfile | null = null;
  messages: Message[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService) {}

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
