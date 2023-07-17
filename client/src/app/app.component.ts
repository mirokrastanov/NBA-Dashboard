import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  menuHandler(menuEl: HTMLElement): void {
    menuEl.style.display = 'block';
  }
  closeHandler(menuEl: HTMLElement): void {
    menuEl.style.display = 'none';
  }
  currentMode: string = 'light';
  modeSwitchHandler(light: HTMLElement, dark: HTMLElement): void {
    this.document.body.classList.toggle('dark-mode-variables');
    light.classList.toggle('active');
    dark.classList.toggle('active');
  }
}
