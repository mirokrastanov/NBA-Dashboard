import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Database } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NbaApiService } from 'src/app/nba/nba-api.service';
import { dbTarget } from 'src/app/util/global-constants';

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
    private apiService: NbaApiService,
  ) { }
  authProfile: any | null = null;
  dbProfile: any | null = null;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;
  favTeams: number[] = [];
  favPlayers: number[] = [];

  ngOnInit(): void {
    // IT WORKS - USE IT when implementing favorites
    // remember to remove the service key during filtering
    
    // const test = this.apiService.testUserExtra(dbTarget.users, JSON.parse(localStorage.getItem('user')!).uid)
    // test.subscribe({
    //   next: (data) => {
    //     console.log(data);
        
    //   }
    // })
    

    this.authProfile = JSON.parse(localStorage.getItem('user')!);
    // console.log(this.authProfile);
    this.apiService.firebaseDbFetch(dbTarget.users).subscribe({
        next: (data) => {
          Object.entries(data).filter(([key, value], i) => {
            // console.log(key, value);
            if (this.authProfile!.uid == key) this.dbProfile = value;
          });
          // console.log(this.dbProfile);
          this.isLoading = false;
        },
        error: (err) => {
          this.errorOccurred = true;
          console.log(err);
          this.isLoading = false;
        },
        complete: () => {
          this.unsubscribed = true;
          // console.log('Data fetched!');
        },
      });


  }

  onUpdateClick(e: MouseEvent): void {
    // get Update profile from the auth service !!! >> see what fits best

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
