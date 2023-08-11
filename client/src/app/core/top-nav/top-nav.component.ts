import { Component, Inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'src/app/user/auth.service';
import { AbstractControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService
  ) { }

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
        this.document.querySelector('#search-ctr')!.classList.remove('show');
        this.document.querySelector('#search-ctr .search-btn span')!.textContent = 'search';
      }
    }, 100);
    this.intervals.push(interval);
  }

  menuHandler(): void {
    this.aside().style.display = 'block';
  }

  @ViewChild('searchForm') searchForm: NgForm | undefined;
  searchHandler(e: MouseEvent, sForm: HTMLElement, sBtn: HTMLElement, sIcon: HTMLElement): void {
    if (window.innerWidth <= 768) {
      sForm.classList.toggle('show');
      if (sForm.classList.contains('show')) {
        sIcon.textContent = 'close';
      } else {
        sIcon.textContent = 'search';
      }
    } else {
      sForm.classList.remove('show');
      sIcon.textContent = 'search';
    }
    // TODO: Add actual search form handling & query to db
    const searchString: AbstractControl<any> = this.searchForm!.controls['search-string'];
    console.log(searchString.value, sBtn.textContent, sForm.classList.contains('show'));



  }

  modeSwitchHandler(light: HTMLElement, dark: HTMLElement): void {
    this.document.body.classList.toggle('dark-mode-variables');
    light.classList.toggle('active');
    dark.classList.toggle('active');
  }

  ngOnDestroy(): void {
    this.intervals.forEach(timer => clearInterval(timer));
  }
}
