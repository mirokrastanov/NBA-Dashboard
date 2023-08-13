import { Component } from '@angular/core';
import { NbaApiService } from '../nba-api.service';
import { Links, Standings, Team, Team2 } from '../nba-types';
import { dbTarget } from 'src/app/util/global-constants';

@Component({
  selector: 'app-standings-east',
  templateUrl: './standings-east.component.html',
  styleUrls: ['./standings-east.component.css']
})
export class StandingsEastComponent {
  constructor(private apiService: NbaApiService) { }
  teamsALL: Team[] | null = null;
  standings: { east: Standings[] } = { east: [] };
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
        // INNER 2 - Standings East
        this.apiService.firebaseDbFetch(dbTarget.nba.standings.east).subscribe({
          next: (data: Standings[]) => {
            this.standings!.east = data;
            this.standings!.east.map((x) => {
              if (x['Team'][1].includes('Philadelphia')) x['Team'][1] = 'Philadelphia Sixers';
              if (x['Team'][1].includes('Clippers')) x['Team'][1] = 'Los Angeles Clippers';
              return x;
            });
            // console.log(this.standings!.east);
            this.standings!.east.forEach(standing => {
              let fullName = standing.Team[1].trim().toLowerCase();
              let found = this.teamsALL!.filter(x => fullName.includes(x.name.trim().toLowerCase()));
              if (found.length == 1) standing.id = String(found[0].id)
              else {
                found.forEach(team => {
                  let name = team.name.trim().toLowerCase();
                  // console.log(name, standing.Team[1]);

                  // SPECIAL FILTERING IS REQUIRED due to the standing.Team[1] not having a true space 
                  // character instead another character that seems like a space, but IS NOT !!! 
                  // Therefore I am replacing it with a real space to proceed with mapping of ids.
                  let xFiltered = standing.Team[1].trim().toLowerCase().split('');
                  xFiltered.forEach((y, i) => {
                    let code = y.charCodeAt(0);
                    if (!(code >= 65 && code <= 90) && !(code >= 97 && code <= 122) && code != 32) {
                      xFiltered.splice(i, 1, ' ');
                    }
                  });
                  let arr = xFiltered.join('').trim().toLowerCase().split(' ');
                  // console.log(arr);
                  arr.forEach(word => {
                    // console.log(word);
                    if (word == name) {
                      standing.id = String(team.id);
                    }
                  });
                });
              }
            });
            // console.log(this.standings!.east);
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
