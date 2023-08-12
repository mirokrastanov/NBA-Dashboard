import { Component, Inject, OnInit, OnDestroy, ViewChild, ViewChildren, Input, AfterViewInit, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'src/app/user/auth.service';
import { AbstractControl, NgForm } from '@angular/forms';
import { Player, Team, Team2 } from 'src/app/nba/nba-types';
import { dbTarget } from 'src/app/util/global-constants';
import { NbaApiService } from 'src/app/nba/nba-api.service';
import { NavigationSkipped, NavigationStart, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private apiService: NbaApiService,
    private router: Router,
    private fireAuth: AngularFireAuth,
  ) {
    this.router.events.subscribe((event) => {
      // console.log(event);
      if (event instanceof NavigationStart || event instanceof NavigationSkipped) {
        // console.log('path change');
        let mode = localStorage.getItem('dark-mode') == 'true' ? true : false;
        if (mode != this.darkModeON) {
          this.checkDarkModeState();
        }
      }
    });
  }

  @ViewChild('searchForm') searchForm: any;
  @ViewChild('sInput') sInput: ElementRef<HTMLInputElement> | undefined;

  aside = () => this.document.body.querySelector('aside')!;
  inputEl = () => this.document.body.querySelector('input[type="search"]');
  get currentUser(): any {
    return this.authService.currentUser;
  }
  isAuthenticated: any = false;
  intervals: any[] = [];
  playersALL: Player[] | null = null;
  teamsALL: Team2[] | null = null;
  searchResults: any[] = [];
  authProfile: any | null = null;
  darkModeON: boolean = false;
  photoURL: string = '../../../assets/images/user-avatar.png';

  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    // console.log(this.currentUser);
    this.checkDarkModeState();
    this.authProfile = JSON.parse(localStorage.getItem('user')!);
    this.authService.authStatusListener();
    this.fireAuth.onAuthStateChanged(async (crendetial) => {
      if (crendetial) {
        setTimeout(() => {
          this.authProfile = JSON.parse(JSON.stringify(crendetial));
          if (this.authProfile!.photoURL) {
            this.photoURL = this.authProfile!.photoURL;
          }
          // console.log(this.authProfile.photoURL);
        }, 1000);
      }
    })
    let interval2 = setInterval(() => {
      this.authService.authStatusListener();
      setTimeout(() => {
        this.authProfile = JSON.parse(JSON.stringify(this.authService.currentUser));
      }, 1000);
    }, 5000);
    this.intervals.push(interval2);

    this.authService.fireAuth.authState.subscribe(authStatus => this.isAuthenticated = authStatus);
    // console.log(window.innerWidth + 'x' + window.innerHeight);
    let interval = setInterval(() => {
      if (window.innerWidth > 768) {
        this.document.querySelector('#search-ctr')!.classList.remove('show');
        this.document.querySelector('#search-ctr .search-btn span')!.textContent = 'search';
      } else {
        if (this.searchResults.length > 0) {
          this.document.querySelector('#search-ctr')!.classList.add('show');
          this.document.querySelector('#search-ctr .search-btn span')!.textContent = 'close';
        }
      }
    }, 100);
    this.intervals.push(interval);
    // this.inputEl()?.addEventListener('input', this.onSearchTyping);

    // OUTER 1 - Teams
    this.apiService.firebaseDbFetch(dbTarget.nba.teamsAPI).subscribe({
      next: (data) => {
        this.teamsALL = data;
        this.teamsALL!.map((x) => {
          if (x.full_name.includes('Philadelphia')) x.full_name = 'Philadelphia Sixers';
          if (x.full_name.includes('Clippers')) x.full_name = 'Los Angeles Clippers';
          if (x.name == '76ers') x.name = 'sixers';
          return x;
        });
        this.teamsALL!.sort((a, b) => a.full_name.localeCompare(b.full_name));
        // this.searchResults = this.teamsALL!; // DEV TEST CODE for search results ctr

        // INNER 1 - Players
        this.apiService.firebaseDbFetch(dbTarget.nba.players).subscribe({
          next: (data: Player[]) => {
            this.playersALL = data.slice()
              .sort((a, b) => a['Player'].localeCompare(b['Player']));
            this.playersALL.map((x) => {
              let teamID = this.teamsALL!.find(y => y.full_name == x['Current Team'])?.id;
              x['teamID'] = String(teamID);
              return x;
            });
            // console.log(this.playersALL, this.teamsALL);
            this.isLoading = false;
          },
          error: (err) => {
            this.errorOccurred = true;
            console.log(err);
            this.isLoading = false;
          },
          complete: () => { this.unsubscribed = true },
        });
      },
      error: (err) => { console.log(err) },
    });
  }

  onSearchTyping(input: HTMLInputElement): void {
    if (input.value.length < 2) {
      this.searchResults = [];
      return;
    };
    const results: Player[] | Team2[] | any[] = [];
    const searched = input.value.trim().toLowerCase();
    this.teamsALL?.forEach((team) => {
      if (team.full_name.trim().toLowerCase().includes(searched)) {
        results.push({ name: team.full_name, id: team.id });
      }
    });
    this.playersALL?.forEach((player) => {
      if (player.Player.trim().toLowerCase().includes(searched)) {
        results.push({ name: player.Player });
      }
    });
    // console.log(results);
    this.searchResults = results;
  }

  onSearchResultClick(name: string, id: string | undefined): void {
    // console.log(name, id);
    this.searchForm?.reset();
    this.searchResults = [];
    if (id) this.router.navigate([`/nba/teams/${id}`]);
    else this.router.navigate([`/nba/players/player/${name}`]);
  }

  menuHandler(): void {
    this.aside().style.display = 'block';
  }

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
  }

  checkDarkModeState(): boolean {
    const storageData = localStorage.getItem('dark-mode');
    if (storageData) {
      if (storageData == 'true') {
        this.darkModeON = true;
        this.document.body.classList.toggle('dark-mode-variables');
        return true;
      }
    } else {
      localStorage.setItem('dark-mode', 'false');
      this.darkModeON = false;
      return false;
    }
    return false;
  }

  modeSwitchHandler(light: HTMLElement, dark: HTMLElement): void {
    // console.log(dark.classList.contains('active'), light.classList.contains('active'));
    if (dark.classList.contains('active')) {
      this.darkModeON = false;
      localStorage.setItem('dark-mode', 'false');
    } else {
      this.darkModeON = true;
      localStorage.setItem('dark-mode', 'true');
    }
    // console.log('mode', localStorage.getItem('dark-mode'));

    this.document.body.classList.toggle('dark-mode-variables');
    light.classList.toggle('active');
    dark.classList.toggle('active');
  }

  ngOnDestroy(): void {
    this.intervals.forEach(timer => clearInterval(timer));
  }
}
