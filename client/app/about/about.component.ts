import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  // add class="contents" to the app component HTML element, so it does not affect styling
  @HostBinding('class')
  elementClass = 'contents'
}
