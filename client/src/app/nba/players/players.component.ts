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

  ngOnInit(): void {
    this.apiService.nbaFetch('players').subscribe({
      next: (data) => {
        this.playersArray = data.data;
        this.metaObject = data.meta;
        console.log(data);
        console.log(this.playersArray);
        console.log(this.metaObject);
        console.log(data.data[0]);
      },
      error: (err) => {
        this.errorOccurred = true;
        console.log(err);
      },
      complete: () => {
        this.unsubscribed = true;
        if (!this.playersArray)
          console.log('Subscription ended!');
      },
    });
  }


}
