import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbaApiService } from '../nba-api.service';
import { News } from '../nba-types';
import { dbTarget } from 'src/app/util/global-constants';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent {
  constructor(
    private apiService: NbaApiService,
    private route: ActivatedRoute,
  ) { }
  newsItem: News | null = null;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;
  itemID: number | undefined;

  ngOnInit(): void {
    this.apiService.firebaseDbFetch(dbTarget.nba.news).subscribe({
      next: (data) => {
        this.itemID = this.route.snapshot.params!['id'];
        this.newsItem = data[this.itemID!];
        // console.log(this.itemID);
        // console.log(this.newsItem);

        this.isLoading = false;
      },
      error: (err) => {
        this.errorOccurred = true;
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        this.unsubscribed = true;
        // console.log('News item data fetched!');
      },
    });
  }
}
