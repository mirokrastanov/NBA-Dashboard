import { Component, OnInit } from '@angular/core';
import { NbaApiService } from '../nba-api.service';
import { Links, Player, Team, Team2 } from '../nba-types';
import { dbTarget } from 'src/app/util/global-constants';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  constructor(private apiService: NbaApiService) { }

  teamsALL: Team2[] | null = null;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    // OUTER 1 - Teams
    this.apiService.firebaseDbFetch(dbTarget.nba.teamsAPI).subscribe({
      next: (data) => {
        this.teamsALL = data;
        this.teamsALL!.map((x) => {
          if (x.full_name.includes('Philadelphia')) x.full_name = 'Philadelphia Sixers';
          if (x.full_name.includes('Clippers')) x.full_name = 'Los Angeles Clippers';
          return x;
        });
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
            console.log(this.teamsALL![0]);
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
