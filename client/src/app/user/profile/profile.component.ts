import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NbaApiService } from 'src/app/nba/nba-api.service';
import { dbTarget } from 'src/app/util/global-constants';
import { Favorites, Team } from 'src/app/nba/nba-types';

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
    this.authProfile = JSON.parse(localStorage.getItem('user')!);
    this.authService.authStatusListener();
    setTimeout(() => {
      this.authProfile = JSON.parse(JSON.stringify(this.authService.currentUser));
      // console.log(this.authProfile.photoURL);

    }, 1000);
    // console.log(this.authProfile);
    this.fetchProfile();
  }

  onFavClick(e: MouseEvent): void {
    const subTarget: HTMLElement | EventTarget | any = e.target!;
    if (subTarget.parentElement.classList.contains('ans')) return;

    const target: HTMLElement | EventTarget | any = e.currentTarget!;
    const ques = this.document.querySelectorAll('.fav');

    if (target.classList.contains('fav-active')) target.classList.remove('fav-active');
    else {
      target.classList.add('fav-active');
      // ques.forEach(x => {
      //   if (x != target) x.classList.remove('fav-active');
      // })
    }
  }

  fetchProfile(): void {
    this.apiService.fetchUserExtra().subscribe({
      next: (data) => {
        this.dbProfile = data;
        this.favorites = this.dbProfile.favorites;
        this.favPlayers = this.apiService.decodeStarName(
          Object.keys(this.favorites!.players)
            .filter(x => x != 'service')
            .join('||||')
        ).split('||||');
        let teamIDs = Object.keys(this.favorites!.teams).filter(x => x != 'service');
        let teams: Team[] = [];
        this.apiService.firebaseDbFetch(dbTarget.nba.teamsAPI).subscribe({
          next: (data: Team[]) => {
            teamIDs.forEach((teamID) => {
              let res = data.find(team => String(teamID) == String(team.id));
              teams.push(res!);
            });
            this.favTeams = teams;
            // console.log(this.favPlayers, this.favTeams);
          },
          error: (err) => console.log(err),
        })
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

  showImgUpload(iUP: HTMLElement) {
    iUP.classList.remove('hide-el');
    // console.log('show');
  }

  hideImgUpload(iUP: HTMLElement) {
    iUP.classList.add('hide-el');
    // console.log('hide');
  }

  onAvatarChange(photoURL: string, iUP: HTMLElement) {
    iUP.classList.add('hide-el');
    if (photoURL == '') return;
    // console.log(photoURL);

    this.authService.updateProfile({ photoURL });
    setTimeout(() => {
      this.authService.authStatusListener();
      setTimeout(() => {
        this.authProfile = JSON.parse(JSON.stringify(this.authService.currentUser));
        // console.log(this.authProfile.photoURL);
      }, 1000);
    }, 1000);
  }
}
