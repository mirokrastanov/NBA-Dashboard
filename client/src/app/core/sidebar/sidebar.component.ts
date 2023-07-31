import { Component, Inject, OnInit, OnDestroy, Output, OnChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  constructor(@Inject(DOCUMENT) private document: Document, private authService: AuthService) { }
  aside = () => this.document.body.querySelector('aside')!;

  isAuthenticated: any = false;
  get currentUser(): any {
    return this.authService.currentUser;
  }

  intervals: any[] = [];

  ngOnInit(): void {
    this.authService.fireAuth.authState.subscribe(authStatus => this.isAuthenticated = authStatus);
    
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

  onLogout(): void {
    this.authService.logout();
    this.authService.authStatusListener();
    this.isAuthenticated = false;
  }
}
