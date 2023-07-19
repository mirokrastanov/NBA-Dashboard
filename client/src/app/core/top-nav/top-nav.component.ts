import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
  constructor(@Inject(DOCUMENT) private document: Document) { }
  aside = () => this.document.body.querySelector('aside')!;

  menuHandler(): void {
    this.aside().style.display = 'block';
  }

  searchHandler(e: MouseEvent, sForm: HTMLElement, sBtn: HTMLElement, sIcon: HTMLElement): void {
    // TODO: Add actual search form handling & query to db
    if (window.innerWidth <= 768) {
      e.preventDefault();
      sForm.classList.toggle('show');
      if (sForm.classList.contains('show')) {
        sIcon.textContent = 'close';
      } else {
        sIcon.textContent = 'search';
      }
    }
  }

  modeSwitchHandler(light: HTMLElement, dark: HTMLElement): void {
    this.document.body.classList.toggle('dark-mode-variables');
    light.classList.toggle('active');
    dark.classList.toggle('active');
  }
}
