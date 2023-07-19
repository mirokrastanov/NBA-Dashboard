import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.apiService.nbaFetch('players').subscribe({
      next: (data) => {
        this.playersArray = data.data;
        this.metaObject = data.meta;
        console.log(data);
        console.log(data.data[0]);
        let test: object = {};
        console.log(test.hasOwnProperty('players'));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
