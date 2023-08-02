import { Component } from '@angular/core';
import { NbaApiService } from '../nba-api.service';
import { News } from '../nba-types';
import { dbTarget } from 'src/app/util/global-constants';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  constructor(private apiService: NbaApiService) { }
  newsArray: News[] | null = null;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.apiService.firebaseDbFetch(dbTarget.nba.news).subscribe({
      next: (data) => {
        this.newsArray = data;
        console.log(this.newsArray);
        console.log(this.newsArray![0]);
        
        this.isLoading = false;
      },
      error: (err) => {
        this.errorOccurred = true;
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        this.unsubscribed = true;
        console.log('News data fetched!');
      },
    });
  }



}
