import { HttpClient } from '@angular/common/http'

import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, of } from 'rxjs';
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
    this.http.post('/api/answer', { question }).pipe(
      // this catches any HTTP error, and returns an 'error' message, by toggling error: true
      // if we would let the error propagate, the observable would stop sending new results
      // since observables end on error.
      catchError((err) => {
        // send a fake message, the code showing the messages will handle it
        return of({ user: 'dino', text: err.error?.error ?? 'An error occurred', date: new Date(), error: true})
      })
     ).subscribe( {
       next: (data: any) => {
         if (data.error) {
           this.$messageSource.next(data)
         }
         else if(data.answerInContext) {
           this.$messageSource.next({ user: 'dino', text: data.answer, date: new Date() })
         }
         else if(!data.answerInContext) {
          this.$messageSource.next({ user: 'dino', text: "Sorry... I don't know! Please ask me something else!", date: new Date() })
        }
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
