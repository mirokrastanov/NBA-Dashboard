import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { NbaApiService } from '../nba-api.service';
import { Router } from '@angular/router';
import { dbTarget } from 'src/app/util/global-constants';
import { Analysis } from '../nba-types';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private apiService: NbaApiService,
    private router: Router
  ) { }
  itemsArray: Analysis[] | null = null;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.apiService.firebaseDbFetch(dbTarget.nba.analysis).subscribe({
      next: (data) => {
        this.itemsArray = data;
        // console.log(this.itemsArray);
        // console.log(this.itemsArray![0]);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorOccurred = true;
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        this.unsubscribed = true;
        // console.log('Analysis data fetched!');
      },
    });
  }

  onFavClick(e: MouseEvent): void {
    const subTarget: HTMLElement | EventTarget | any = e.target!;
    if (subTarget.parentElement.parentElement.classList.contains('ans')
      || subTarget.parentElement.classList.contains('ans')
      || subTarget.classList.contains('ans')) return;

    const target: HTMLElement | EventTarget | any = e.currentTarget!;
    const ques = this.document.querySelectorAll('.fav');
    // console.log('sub target -->', subTarget);
    // console.log('target -->', target);

    if (target.classList.contains('fav-active')) target.classList.remove('fav-active');
    else {
      target.classList.add('fav-active');
      ques.forEach(x => {
        if (x != target) x.classList.remove('fav-active');
      })
    }
  }

  onReadMoreClick(e: MouseEvent): void {
    e.preventDefault();
    const target: HTMLElement | EventTarget | any = e.target!;
    // console.log(target.dataset.index);
    const currentIndex = target.dataset.index;
    this.router.navigate([`/nba/analysis/${currentIndex}`]);
  }
}
