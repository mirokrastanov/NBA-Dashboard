import { Component } from '@angular/core';
import { NbaApiService } from '../nba-api.service';
import { ActivatedRoute } from '@angular/router';
import { Player, Team } from '../nba-types';
import { dbTarget } from 'src/app/util/global-constants';

@Component({
  selector: 'app-team-item-roster',
  templateUrl: './team-item-roster.component.html',
  styleUrls: ['./team-item-roster.component.css']
})
export class TeamItemRosterComponent {
  constructor(private apiService: NbaApiService, private route: ActivatedRoute) { }

  playersALL: Player[] | null = null;
  teamsALL: Team[] | null = null;
  currentTeam: Team | undefined;
  currentRoster: Player[] | null = null;
  routeID: string | number | null = null;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.routeID = this.route.snapshot.paramMap.get('id');
    // console.log(this.routeID);
    // OUTER 1 - Teams
    this.apiService.firebaseDbFetch(dbTarget.nba.teamsAPI).subscribe({
      next: (data) => {
        this.teamsALL = data;
        this.teamsALL!.map((x) => {
          if (x.full_name.includes('Philadelphia')) x.full_name = 'Philadelphia Sixers';
          if (x.full_name.includes('Clippers')) x.full_name = 'Los Angeles Clippers';
          return x;
        });
        this.currentTeam = this.teamsALL!.find(x => x.id == this.routeID)
        // console.log(this.currentTeam);
        // INNER 1 - Players
        this.apiService.firebaseDbFetch(dbTarget.nba.players).subscribe({
          next: (data: Player[]) => {
            this.playersALL = data;
            this.currentRoster = data.slice()
              .sort((a, b) => a['Player'].localeCompare(b['Player']));
            this.currentRoster.map((x) => {
              let teamID = this.teamsALL!.find(y => y.full_name == x['Current Team'])?.id;
              x['teamID'] = String(teamID);
              return x;
            });
            this.currentRoster = this.currentRoster.filter(x => x!['teamID'].toString() == this.routeID!.toString());
            // console.log(this.currentRoster);
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
