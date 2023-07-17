import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  menuHandler(menuEl: HTMLElement): void {
    menuEl.style.display = 'block';
  }
  closeHandler(menuEl: HTMLElement): void {
    menuEl.style.display = 'none';
  }

}
