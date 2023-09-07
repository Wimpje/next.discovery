import { Component, Input } from '@angular/core';
import { Message } from 'types/types';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  get isQuestion() {
    return this.message?.user !== 'dino'
  }

  get isAnswer() {
    return this.message?.user === 'dino'
  }

  get userIcon() {
    return `assets/${this.message.user}.png`
  }

  @Input() message!: Message

}
