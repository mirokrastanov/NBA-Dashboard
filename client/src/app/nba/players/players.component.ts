import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NbaApiService } from '../nba-api.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  constructor(private apiService: NbaApiService) { }
  playersArray: any;
  metaObject: any;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;

  ngOnInit(): void {
    this.apiService.nbaFetch('play').subscribe({
      next: (data) => {
        this.playersArray = data.data;
        this.metaObject = data.meta;
        console.log(data);
        console.log(this.metaObject);
        console.log(data.data[0]);
      },
      error: (err) => {
        this.errorOccurred = true;
        console.log(err);
      },
      complete: () => {
        this.unsubscribed = true;
        console.log('Subscription ended!');
      },
    });
  }


}
