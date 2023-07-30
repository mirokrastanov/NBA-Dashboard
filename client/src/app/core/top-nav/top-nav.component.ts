import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document, private authService: AuthService) { }
  aside = () => this.document.body.querySelector('aside')!;

  isAuthenticated: any = false;
  get currentUser(): any {
    return this.authService.currentUser;
  }


  ngOnInit(): void {
    this.authService.fireAuth.authState.subscribe(authStatus => this.isAuthenticated = authStatus);

  }

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
