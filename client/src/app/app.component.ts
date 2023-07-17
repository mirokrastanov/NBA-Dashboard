import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Order, orders } from '../assets/mockData';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  orders: Order[] = orders;
  intervals: any[] = [];

  ngOnInit(): void {
    // console.log(window.innerWidth + 'x' + window.innerHeight);
    let aside = () => document.body.querySelector('aside')!;
    let interval = setInterval(() => {
      if (window.innerWidth > 768) {
        if (aside().style.display = 'none') {
          aside().style.display = 'block';
        }
      }
    }, 100);
    this.intervals.push(interval);
  }

  ngOnDestroy(): void {
    this.intervals.forEach(timer => clearInterval(timer));
  }

  menuHandler(menuEl: HTMLElement): void {
    menuEl.style.display = 'block';
  }

  closeHandler(menuEl: HTMLElement): void {
    menuEl.style.display = 'none';
  }

  searchHandler(e: MouseEvent, sForm: HTMLElement, sBtn: HTMLElement, sIcon: HTMLElement): void {

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