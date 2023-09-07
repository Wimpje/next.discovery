import { Component } from '@angular/core';
import { AiService } from 'client/app/ai-service.service';

@Component({
  selector: 'app-inputbox',
  templateUrl: './inputbox.component.html',
  styleUrls: ['./inputbox.component.scss']
})
export class InputboxComponent {

  public question = ''

  constructor(private aiService: AiService) {

  }

  askQuestion() {
    if (this.question) {
      this.aiService.getAnswer(this.question)
      this.question = ''
    }
  }
}
