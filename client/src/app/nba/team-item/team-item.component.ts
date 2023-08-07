import { Component } from '@angular/core';
import { Player, Team } from '../nba-types';
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
  currentTeam: Team | undefined;
  routeID: string | number | null = null;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.routeID = this.route.snapshot.paramMap.get('id');
    console.log(this.routeID);

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
        this.apiService.firebaseDbFetch(dbTarget.nba.players).subscribe({
          next: (data: Player[]) => {
            // this.playersALL = data.slice();
            // let player: Player[] | undefined;
            // player = this.playersALL!.filter(x => x['Player']!.toLowerCase() == this.routeID!.toLowerCase());
            // player.map((x) => {
            //   let teamID = this.teamsALL!.find(y => y.full_name == x['Current Team'])?.id;
            //   x['teamID'] = String(teamID);
            //   this.teamID = teamID!;
            //   return x;
            // });
            this.isLoading = false;
          },
          error: (err) => {
            this.errorOccurred = true;
            console.log(err);
            this.isLoading = false;
          },
          complete: () => {
            this.unsubscribed = true;
            // console.log('Players data fetched!');
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
