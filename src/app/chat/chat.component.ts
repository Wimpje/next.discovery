import { Component } from '@angular/core';
import { Message } from 'types/types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  chatMessages: Message[] = [
    { user: 'me', text: 'Can you help me answer a question about stegosauruses?', date: new Date() },
    { user: 'dino', text: 'Sure! I know everything about dinosaurs!', date: new Date() }
  ]
}
