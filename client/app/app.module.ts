import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { AboutComponent } from './about/about.component';
import { MessageComponent } from './chat/message/message.component';
import { InputboxComponent } from './chat/inputbox/inputbox.component'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
   declarations: [
      AppComponent,
      ChatComponent,
      AboutComponent,
      MessageComponent,
      InputboxComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
