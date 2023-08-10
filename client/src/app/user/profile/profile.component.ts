import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Database } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NbaApiService } from 'src/app/nba/nba-api.service';
import { dbTarget } from 'src/app/util/global-constants';
import { Favorites } from 'src/app/nba/nba-types';

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
  favorites: Favorites | null = null;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;
  favTeams: any[] = [];
  favPlayers: any[] = [];

  ngOnInit(): void {
    // IT WORKS - USE IT when implementing favorites
    // remember to remove the service key during filtering

    // const test = this.apiService.testUserExtra(dbTarget.users, JSON.parse(localStorage.getItem('user')!).uid)
    // test.subscribe({
    //   next: (data) => {
    //     console.log(data);

    //   }
    // })


    // this.apiService.getFavorites().subscribe({
    //   next: (data) => {
    //     console.log(data);

    //   }
    // })

    this.authProfile = JSON.parse(localStorage.getItem('user')!);
    // console.log(this.authProfile);
    this.fetchProfile();


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

  fetchProfile(): void {
    this.apiService.fetchUserExtra().subscribe({
      next: (data) => {
        this.dbProfile = data;
        this.favorites = this.dbProfile.favorites;
        this.favPlayers = Object.keys(this.favorites!.players).filter(x => x != 'service');
        this.favTeams = Object.keys(this.favorites!.teams).filter(x => x != 'service');
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

  onFavPlayer(e: MouseEvent): void {
    this.apiService.addFavoritePlayer('test1');
    this.isLoading = true;
    setTimeout(() => {
      this.fetchProfile();
      this.isLoading = false;
    }, 1000);
  }
  onFavTeam(e: MouseEvent): void {

  }
  onUNfavPlayer(e: MouseEvent): void {
    this.apiService.removeFavoritePlayer('test1');
    this.isLoading = true;
    setTimeout(() => {
      this.fetchProfile();
      this.isLoading = false;
    }, 1000);
  }
  onUNfavTeam(e: MouseEvent): void {

  }
}
