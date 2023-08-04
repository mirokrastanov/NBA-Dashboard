import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NbaApiService } from '../nba-api.service';
import { Player } from '../nba-types';
import { dbTarget } from 'src/app/util/global-constants';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  constructor(private apiService: NbaApiService) { }
  playersALL: Player[] | null = null;
  playersSHOWN: Player[] | null = null;
  currentPage: number = 1;
  perPage: number = 25;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.apiService.firebaseDbFetch(dbTarget.nba.players).subscribe({
      next: (data: Player[]) => {
        this.playersALL = data.slice()
          .sort((a, b) => a['Player'].localeCompare(b['Player']));
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
