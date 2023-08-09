import { Component } from '@angular/core';
import { NbaApiService } from '../nba-api.service';
import { Player, Team } from '../nba-types';
import { ActivatedRoute } from '@angular/router';
import { dbTarget } from 'src/app/util/global-constants';

@Component({
  selector: 'app-player-item',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.css']
})
export class PlayerItemComponent {
  constructor(private apiService: NbaApiService, private route: ActivatedRoute) { }

  playersALL: Player[] | null = null;
  teamsALL: Team[] | null = null;
  routeName: string | null = null;
  currentPlayer: Player | null = null;
  teamID: string | number | null = null;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.routeName = this.route.snapshot.paramMap.get('name');
    // console.log(this.routeName);

    this.apiService.firebaseDbFetch(dbTarget.nba.teamsAPI).subscribe({
      next: (data) => {
        this.teamsALL = data;
        this.teamsALL!.map((x) => {
          if (x.full_name.includes('Philadelphia')) x.full_name = 'Philadelphia Sixers';
          if (x.full_name.includes('Clippers')) x.full_name = 'Los Angeles Clippers';
          return x;
        });
        this.apiService.firebaseDbFetch(dbTarget.nba.players).subscribe({
          next: (data: Player[]) => {
            this.playersALL = data.slice();
            let player: Player[] | undefined;
            player = this.playersALL!.filter(x => x['Player']!.toLowerCase() == this.routeName!.toLowerCase());
            player.map((x) => {
              let teamID = this.teamsALL!.find(y => y.full_name == x['Current Team'])?.id;
              x['teamID'] = String(teamID);
              this.teamID = teamID!;
              return x;
            });
            this.currentPlayer = player[0];
            // console.log(this.currentPlayer);
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
