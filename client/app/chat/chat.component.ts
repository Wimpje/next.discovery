import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from 'types/types';
import { AiService } from '../ai-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  chatMessages: Message[] = []
  error = '' // for displaying a simple error message

  get showLoader() {
    return this.aiService.loading
  }

  // this is so we can scroll the message container when a new question is asked
  @ViewChild('viewport') viewport!: ElementRef

  constructor(private aiService: AiService) {
    this.aiService.onMessage().subscribe((message) => {
      if (!message.error) {
        this.chatMessages.push(message)
      }
      else {
        this.error = 'Error: ' + message.text
      }
      // on initial load the nativeElement is not there yet so checking first
      if (this.viewport?.nativeElement) {
        // use a settimout so everything is rendered and the height is correct (this can probably be done nicer)
        setTimeout(() => {
          const offsetHeight = this.viewport.nativeElement.scrollHeight
          this.viewport.nativeElement.scrollTo({ top: offsetHeight })
        }, 50)
      }

    })
  }

  ngOnInit() {
    this.aiService.displayInitial()
  }



}
