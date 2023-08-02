import { Component, Inject } from '@angular/core';
import { NbaApiService } from '../nba-api.service';
import { News } from '../nba-types';
import { dbTarget } from 'src/app/util/global-constants';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private apiService: NbaApiService,
    private router: Router
  ) { }
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
    this.router.navigate([`/nba/news/${currentIndex}`]);
  }
}
