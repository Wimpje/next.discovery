import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChatComponent } from './chat/chat.component'
import { AboutComponent } from './about/about.component'

const routes: Routes = [
  { path: '', component: ChatComponent },
  { path: 'about', component: AboutComponent },
]

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
