import { Component } from '@angular/core';
import { NbaApiService } from '../nba-api.service';
import { Links, Standings, Team, Team2 } from '../nba-types';
import { dbTarget } from 'src/app/util/global-constants';

@Component({
  selector: 'app-standings-west',
  templateUrl: './standings-west.component.html',
  styleUrls: ['./standings-west.component.css']
})
export class StandingsWestComponent {
  constructor(private apiService: NbaApiService) { }
  teamsALL: Team[] | null = null;
  standings: { west: Standings[] } = { west: [] };
  linksALL: Links[] | undefined;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    // OUTER 1 - Teams
    this.apiService.firebaseDbFetch(dbTarget.nba.teamsAPI).subscribe({
      next: (data: Team[]) => {
        this.teamsALL = data;
        this.teamsALL!.map((x) => {
          if (x.full_name.includes('Philadelphia')) x.full_name = 'Philadelphia Sixers';
          if (x.full_name.includes('Clippers')) x.full_name = 'Los Angeles Clippers';
          if (x.name == '76ers') x.name = 'sixers';
          return x;
        });
        // console.log(this.teamsALL);
        // INNER 1 - Standings West
        this.apiService.firebaseDbFetch(dbTarget.nba.standings.west).subscribe({
          next: (data: Standings[]) => {
            this.standings!.west = data;
            this.standings!.west.map((x) => {
              if (x['Team'][1].includes('Philadelphia')) x['Team'][1] = 'Philadelphia Sixers';
              if (x['Team'][1].includes('Clippers')) x['Team'][1] = 'Los Angeles Clippers';
              return x;
            });
            // console.log(this.standings!.west);
            this.isLoading = false;
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
            // console.log(this.standings!.west);
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
      },
      error: (err) => { console.log(err) },
      complete: () => {
        // console.log('Teams data fetched!');
      },
    });
  };
}
