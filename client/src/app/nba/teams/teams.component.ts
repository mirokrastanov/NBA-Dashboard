import { Component, OnInit } from '@angular/core';
import { NbaApiService } from '../nba-api.service';
import { Team } from '../nba-types';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  constructor(private apiService: NbaApiService) { }
  teamsArray: Team[] | null = null;
  metaObject: { [key: string]: any } = {};
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.apiService.nbaFetch('teams').subscribe({
      next: (data) => {
        this.teamsArray = data.data;
        this.metaObject = data.meta;
        console.log(data);
        console.log(data.data[0]);
        let test: object = {};
        console.log(test.hasOwnProperty('teams'));

        this.isLoading = false;
      },
      error: (err) => {
        this.errorOccurred = true;
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        this.unsubscribed = true;
        console.log('Subscription ended! Teams data fetched!');
      },
    });
  }

}
