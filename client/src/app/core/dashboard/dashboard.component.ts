import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NbaApiService } from 'src/app/nba/nba-api.service';
import { Leaders, LeadersInner, Links, Player, Standings, Team, Team2 } from 'src/app/nba/nba-types';
import { AuthService } from 'src/app/user/auth.service';
import { dbTarget } from 'src/app/util/global-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private apiService: NbaApiService,
  ) { }

  playersALL: Player[] | null = null;
  teamsALL: Team2[] | null = null;
  leadersALL: Leaders = { advanced: [], averages: [], misc: [], totals: [] };
  standings: { east: Standings[], west: Standings[] } = { east: [], west: [] };

  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;
  isAuthenticated: any = false;


  ngOnInit(): void {
    this.authService.fireAuth.authState.subscribe(authStatus => this.isAuthenticated = authStatus);
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
        console.log(this.teamsALL);
        // INNER 1 - Links
        this.apiService.firebaseDbFetch(dbTarget.nba.teamLinks).subscribe({
          next: (data: Links[]) => {
            // console.log(data);
            let links = data.slice();
            for (let i = 0; i < this.teamsALL!.length; i++) {
              let current = this.teamsALL![i];
              let found = links.slice().filter(x => current.full_name.toLowerCase().includes(x.name));
              // console.log(found);
              if (found.length == 1) this.teamsALL![i].logo = found[0].logo;
              else {
                let arr = current!.full_name.toLowerCase().split(' ');
                found.forEach(x => {
                  arr.forEach(y => {
                    if (y == x.name.toLowerCase()) this.teamsALL![i].logo = x.logo;
                  })
                });
              }
            }
            // console.log(this.teamsALL![0]);
            this.isLoading = false;
          },
          error: (err) => {
            this.errorOccurred = true;
            console.log(err);
            this.isLoading = false;
          },
          complete: () => {
            this.unsubscribed = true;
          },
        });
        // INNER 2 - Standings East
        this.apiService.firebaseDbFetch(dbTarget.nba.standings.east).subscribe({
          next: (data: Standings[]) => {
            this.standings!.east = data;
            this.standings!.east.map((x) => {
              if (x['Team'][1].includes('Philadelphia')) x['Team'][1] = 'Philadelphia Sixers';
              if (x['Team'][1].includes('Clippers')) x['Team'][1] = 'Los Angeles Clippers';
              return x;
            });
            this.standings!.east.forEach(standing => {
              let fullName = standing.Team[1].trim().toLowerCase();
              let found = this.teamsALL!.filter(x => fullName.includes(x.name.trim().toLowerCase()));
              if (found.length == 1) standing.id = String(found[0].id)
              else {
                let arr = fullName.split(' ');
                found.forEach(foundEl => {
                  arr.forEach(teamWord => {
                    if (teamWord == foundEl.name.toLowerCase()) standing.id = String(foundEl.id);
                  });
                });
              }
            });
            console.log('east', this.standings!.east);
            this.isLoading = false;
          },
          error: (err) => {
            this.errorOccurred = true;
            console.log(err);
            this.isLoading = false;
          },
          complete: () => {
            this.unsubscribed = true;
          },
        });
        // INNER 3 - Standings West
        this.apiService.firebaseDbFetch(dbTarget.nba.standings.west).subscribe({
          next: (data: Standings[]) => {
            this.standings!.west = data;
            this.standings!.west.map((x) => {
              if (x['Team'][1].includes('Philadelphia')) x['Team'][1] = 'Philadelphia Sixers';
              if (x['Team'][1].includes('Clippers')) x['Team'][1] = 'Los Angeles Clippers';
              return x;
            });
            this.standings!.west.forEach(standing => {
              let fullName = standing.Team[1].trim().toLowerCase();
              let found = this.teamsALL!.filter(x => fullName.includes(x.name.trim().toLowerCase()));
              if (found.length == 1) standing.id = String(found[0].id)
              else {
                let arr = fullName.split(' ');
                found.forEach(foundEl => {
                  arr.forEach(teamWord => {
                    if (teamWord == foundEl.name.toLowerCase()) standing.id = String(foundEl.id);
                  });
                });
              }
            });
            console.log('west', this.standings!.west);
          },
          error: (err) => {
            this.errorOccurred = true;
            console.log(err);
            this.isLoading = false;
          },
          complete: () => {
            this.unsubscribed = true;
          },
        });
        // INNER 4 - Leaders Advanced
        this.apiService.firebaseDbFetch(dbTarget.nba.leaders.advanced).subscribe({
          next: (data: LeadersInner[]) => {
            this.leadersALL.advanced = data;

            console.log(this.leadersALL.advanced![0]);
            console.log(this.leadersALL.advanced![0].top5[0]);
          },
          error: (err) => {
            this.errorOccurred = true;
            console.log(err);
            this.isLoading = false;
          }
        });
        // INNER 5 - Leaders Averages
        this.apiService.firebaseDbFetch(dbTarget.nba.leaders.averages).subscribe({
          next: (data: LeadersInner[]) => {
            this.leadersALL.averages = data;

            console.log(this.leadersALL.averages);
          },
          error: (err) => {
            this.errorOccurred = true;
            console.log(err);
            this.isLoading = false;
          }
        });
        // INNER 6 - Leaders Misc
        this.apiService.firebaseDbFetch(dbTarget.nba.leaders.misc).subscribe({
          next: (data: LeadersInner[]) => {
            this.leadersALL.misc = data;
          },
          error: (err) => {
            this.errorOccurred = true;
            console.log(err);
            this.isLoading = false;
          }
        });
        // INNER 7 - Leaders Totals
        this.apiService.firebaseDbFetch(dbTarget.nba.leaders.totals).subscribe({
          next: (data: LeadersInner[]) => {
            this.leadersALL.totals = data;
            console.log(this.leadersALL);

          },
          error: (err) => {
            this.errorOccurred = true;
            console.log(err);
            this.isLoading = false;
          }
        });







      },
      error: (err) => { console.log(err) },
    });
  };


}
