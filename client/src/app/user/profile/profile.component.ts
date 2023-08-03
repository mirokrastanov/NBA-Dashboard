import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Database } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private authService: AuthService,
    public database: Database,
  ) { }
  authProfile: {} | null = null;
  dbProfile: {} | null = null;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.authProfile = JSON.parse(localStorage.getItem('user')!);
    console.log(this.authProfile);


  }

  onUpdateClick(e: MouseEvent): void {
    // get Update profile from the auth service !!! >> see what fits best

    // this.apiService.firebaseDbFetch().subscribe({
    //   next: (data) => {
    //     this.authProfile = data;
    //     // console.log(this.authProfile);

    //     this.isLoading = false;
    //   },
    //   error: (err) => {
    //     this.errorOccurred = true;
    //     console.log(err);
    //     this.isLoading = false;
    //   },
    //   complete: () => {
    //     this.unsubscribed = true;
    //     // console.log('News item data fetched!');
    //   },
    // });
  }

  onFavClick(e: MouseEvent): void {
    const subTarget: HTMLElement | EventTarget | any = e.target!;
    if (subTarget.parentElement.classList.contains('ans')) return;

    const target: HTMLElement | EventTarget | any = e.currentTarget!;
    const ques = this.document.querySelectorAll('.fav');

    if (target.classList.contains('fav-active')) target.classList.remove('fav-active');
    else {
      target.classList.add('fav-active');
      ques.forEach(x => {
        if (x != target) x.classList.remove('fav-active');
      })
    }
  }
}
