import { Component } from '@angular/core';
import { Analysis } from '../nba-types';
import { ActivatedRoute } from '@angular/router';
import { NbaApiService } from '../nba-api.service';
import { dbTarget } from 'src/app/util/global-constants';

@Component({
  selector: 'app-analysis-item',
  templateUrl: './analysis-item.component.html',
  styleUrls: ['./analysis-item.component.css']
})
export class AnalysisItemComponent {
  constructor(
    private apiService: NbaApiService,
    private route: ActivatedRoute,
  ) { }
  item: Analysis | null = null;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;
  itemID: number | undefined;

  ngOnInit(): void {
    this.apiService.firebaseDbFetch(dbTarget.nba.analysis).subscribe({
      next: (data) => {
        this.itemID = this.route.snapshot.params!['id'];
        this.item = data[this.itemID!];
        // console.log(this.itemID);
        // console.log(this.item);

        this.isLoading = false;
      },
      error: (err) => {
        this.errorOccurred = true;
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        this.unsubscribed = true;
        // console.log('Data fetched!');
      },
    });
  }
}
