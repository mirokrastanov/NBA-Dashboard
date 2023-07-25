import { Component, Inject, OnInit, OnDestroy, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  constructor(@Inject(DOCUMENT) private document: Document) { }
  aside = () => this.document.body.querySelector('aside')!;

  isLogged: boolean = false;

  intervals: any[] = [];

  ngOnInit(): void {
    // console.log(window.innerWidth + 'x' + window.innerHeight);
    let interval = setInterval(() => {
      if (window.innerWidth > 768) {
        if (this.aside().style.display = 'none') {
          this.aside().style.display = 'block';
        }
      }
    }, 100);
    this.intervals.push(interval);
  }

  ngOnDestroy(): void {
    this.intervals.forEach(timer => clearInterval(timer));
  }

  closeHandler(menuEl: HTMLElement): void {
    menuEl.style.display = 'none';
  }
}
