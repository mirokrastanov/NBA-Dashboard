import { Component } from '@angular/core';
import { Links, Player, Standings, StatsAdvanced, StatsAverages, StatsMisc, StatsTotals, Team } from '../nba-types';
import { NbaApiService } from '../nba-api.service';
import { ActivatedRoute } from '@angular/router';
import { dbTarget } from 'src/app/util/global-constants';

@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.css']
})
export class TeamItemComponent {
  constructor(private apiService: NbaApiService, private route: ActivatedRoute) { }

  playersALL: Player[] | null = null;
  teamsALL: Team[] | null = null;
  standings: {
    east: Standings[],
    west: Standings[],
  } = { east: [], west: [] };
  currentTeam: Team | undefined;
  currentLinks: Links | undefined;
  currentStanding: Standings | null = null; 
  routeID: string | number | null = null;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.routeID = this.route.snapshot.paramMap.get('id');
    // console.log(this.routeID);
    // OUTER 1 - Teams
    this.apiService.nbaFetch('teams').subscribe({
      next: (data) => {
        this.teamsALL = data.data;
        this.teamsALL!.map((x) => {
          if (x.full_name.includes('Philadelphia')) x.full_name = 'Philadelphia Sixers';
          if (x.full_name.includes('Clippers')) x.full_name = 'Los Angeles Clippers';
          return x;
        });
        this.currentTeam = this.teamsALL!.find(x => x.id == this.routeID)
        console.log(this.currentTeam);
        // INNER 1 - Links
        this.apiService.firebaseDbFetch(dbTarget.nba.teamLinks).subscribe({
          next: (data: Links[]) => {
            let found = data.filter(x => this.currentTeam!.full_name.toLowerCase().includes(x.name));
            // console.log(found);
            if (found.length == 1) this.currentLinks = found[0];
            else {
              let arr = this.currentTeam!.full_name.toLowerCase().split(' ');
              found.forEach(x => {
                arr.forEach(y => {
                  if (y == x.name.toLowerCase()) this.currentLinks = x;
                })
              });
            }
            // console.log(this.currentLinks);
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
            let currentName = this.currentTeam!.full_name.trim().toLowerCase();
            this.standings!.east.forEach(x => {
              let xArr = x['Team'];
              let xTeam = xArr[1].trim();
              let xFiltered = xTeam.split('');
              xFiltered.forEach((y, i) => {
                let code = y.charCodeAt(0);
                if (!(code >= 65 && code <= 90) && !(code >= 97 && code <= 122) && code != 32) {
                  xFiltered.splice(i, 1, ' ');
                }
              });
              xTeam = xFiltered.join('').trim().toLowerCase();
              if (xTeam == currentName) {
                // console.log(x['Team'][1], ' >> ', x);
                this.currentStanding = x;
                console.log(this.currentStanding);
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
        // INNER 2 - Standings West
        this.apiService.firebaseDbFetch(dbTarget.nba.standings.west).subscribe({
          next: (data: Standings[]) => {
            this.standings!.west = data;
            this.standings!.west.map((x) => {
              if (x['Team'][1].includes('Philadelphia')) x['Team'][1] = 'Philadelphia Sixers';
              if (x['Team'][1].includes('Clippers')) x['Team'][1] = 'Los Angeles Clippers';
              return x;
            });
            let currentName = this.currentTeam!.full_name.trim().toLowerCase();
            this.standings!.west.forEach(x => {
              let xArr = x['Team'];
              let xTeam = xArr[1].trim();
              let xFiltered = xTeam.split('');
              xFiltered.forEach((y, i) => {
                let code = y.charCodeAt(0);
                if (!(code >= 65 && code <= 90) && !(code >= 97 && code <= 122) && code != 32) {
                  xFiltered.splice(i, 1, ' ');
                }
              });
              xTeam = xFiltered.join('').trim().toLowerCase();
              if (xTeam == currentName) {
                // console.log(x['Team'][1], ' >> ', x);
                this.currentStanding = x;
                console.log(this.currentStanding);
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
      },
      error: (err) => { console.log(err) },
      complete: () => {
        // console.log('Teams data fetched!');
      },
    });
  };
}
