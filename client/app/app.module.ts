import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { AboutComponent } from './about/about.component';
import { MessageComponent } from './chat/message/message.component';
import { InputboxComponent } from './chat/inputbox/inputbox.component'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './chat/loading/loading.component';

@NgModule({
   declarations: [
      AppComponent,
      ChatComponent,
      AboutComponent,
      MessageComponent,
      InputboxComponent,
      LoadingComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
