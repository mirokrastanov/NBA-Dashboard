import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NbaApiService } from '../nba-api.service';
import { Player } from '../nba-types';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  constructor(private apiService: NbaApiService) { }
  playersArray: Player[] | null = null;
  metaObject: { [key: string]: any } = {};
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.apiService.nbaFetch('players').subscribe({
      next: (data) => {
        this.playersArray = data.data;
        this.metaObject = data.meta;
        console.log(data);
        console.log(this.playersArray);
        console.log(this.metaObject);
        console.log(data.data[0]);
        this.isLoading = false;
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
    // this.apiService.testFetch();
  }


}
