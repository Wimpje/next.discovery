import { HttpClient } from '@angular/common/http'

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from 'types/types';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  // this is a Subject that outputs a Message whenever
  private $messageSource: Subject<Message> = new Subject<Message>()
  private requestInProgress = false

  get loading() {
    return this.requestInProgress
  }

  constructor(private http: HttpClient) {

  }

  onMessage(): Observable<Message> {
    return this.$messageSource
  }

  // this asks the server for an answer
  getAnswer(question: string) {
    this.$messageSource.next({user: 'me', text: question, date: new Date()})
    this.requestInProgress = true
    this.http.post('/api/answer', { question }).subscribe({
      next: (data: any) => {
        this.$messageSource.next({ user: 'dino', text: data, date: new Date() })
        this.requestInProgress = false
      },
      error: (err) => {
        this.requestInProgress = false
      }
    })
  }

  // this just returns two test message to test the UI
  testUi() {
    this.$messageSource.next({ user: 'me', text: 'Can you help me answer a question about stegosauruses?', date: new Date() })
    this.$messageSource.next({ user: 'dino', text: 'Sure! I know everything about dinosaurs!', date: new Date() })
  }
}
