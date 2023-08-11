import { Component, Inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'src/app/user/auth.service';
import { AbstractControl, NgForm } from '@angular/forms';
import { Player, Team, Team2 } from 'src/app/nba/nba-types';
import { dbTarget } from 'src/app/util/global-constants';
import { NbaApiService } from 'src/app/nba/nba-api.service';
import { Router } from '@angular/router';

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
  ) { }

  @ViewChild('searchForm') searchForm: NgForm | undefined;
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

  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

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
    console.log(name, id);
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
    // TODO: Add actual search form handling & query to db
    const searchString: AbstractControl<any> = this.searchForm!.controls['search-string'];
    // console.log(searchString.value, sBtn.textContent, sForm.classList.contains('show'));
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
