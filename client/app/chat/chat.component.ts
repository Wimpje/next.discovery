import { Component } from '@angular/core';
import { Message } from 'types/types';
import { AiService } from '../ai-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  chatMessages: Message[] = []

  get showLoader() {
    return this.aiService.loading
  }
  constructor(private aiService: AiService) {
    this.aiService.onMessage().subscribe((message) => {
      this.chatMessages.push(message)
    })
  }

  ngOnInit() {
    this.aiService.testUi()
  }
}
