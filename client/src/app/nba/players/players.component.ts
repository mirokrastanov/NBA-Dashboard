import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NbaApiService } from '../nba-api.service';
import { Player, Team } from '../nba-types';
import { dbTarget } from 'src/app/util/global-constants';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  constructor(private apiService: NbaApiService) { }
  playersALL: Player[] | null = null;
  teamsALL: Team[] | null = null;
  playersSHOWN: Player[] | null = null;
  currentPage: number = 1;
  perPage: number = 25;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.apiService.nbaFetch('teams').subscribe({
      next: (data) => {
        this.teamsALL = data.data;
        this.teamsALL!.map((x) => {
          if (x.full_name.includes('Philadelphia')) x.full_name = 'Philadelphia Sixers';
          if (x.full_name.includes('Clippers')) x.full_name = 'Los Angeles Clippers';
          return x;
        });
        this.teamsALL!.sort((a, b) => a.full_name.localeCompare(b.full_name));
        console.log(this.teamsALL);
        // console.log(this.teamsALL![0]);

        this.apiService.firebaseDbFetch(dbTarget.nba.players).subscribe({
          next: (data: Player[]) => {
            this.playersALL = data.slice()
              .sort((a, b) => a['Player'].localeCompare(b['Player']));
            this.playersALL.map((x) => {
              let teamID = this.teamsALL!.find(y => y.full_name == x['Current Team'])?.id;
              x['teamID'] = String(teamID);
              return x;
            });
            // console.log(this.playersALL);
            // console.log(this.playersALL![0]);
            this.isLoading = false;
            this.changePage(1);
          },
          error: (err) => {
            this.errorOccurred = true;
            console.log(err);
            this.isLoading = false;
          },
          complete: () => {
            this.unsubscribed = true;
            console.log('Players data fetched!');
          },
        });
      },
      error: (err) => { console.log(err) },
      complete: () => { console.log('Teams data fetched!') },
    });
  }

  onPageBack(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.changePage(this.currentPage);
    }
  }

  onPageForward(): void {
    if (this.currentPage < this.numPages()) {
      this.currentPage++;
      this.changePage(this.currentPage);
    }
  }

  changePage(page: number): void {
    if (page < 1) page = 1;
    if (page > this.numPages()) page = this.numPages();
    this.playersSHOWN = [];
    for (let i = (page - 1) * this.perPage; i < (page * this.perPage); i++) {
      this.playersSHOWN.push(this.playersALL![i]);
    }
    console.log(this.playersSHOWN);
  }

  numPages(): number {
    return Math.ceil(this.playersALL!.length / this.perPage);
  }
}
