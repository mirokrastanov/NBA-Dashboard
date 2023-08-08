import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { NbaApiService } from '../nba-api.service';
import { Router } from '@angular/router';
import { dbTarget } from 'src/app/util/global-constants';
import { Team, Team2, Transactions } from '../nba-types';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private apiService: NbaApiService,
    private router: Router
  ) { }
  transactionsALL: Transactions[] | null = null;
  teamsALL: Team2[] | null = null;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.apiService.nbaFetch('teams').subscribe({
      next: (data) => {
        this.teamsALL = data.data;
        this.teamsALL!.map((x) => {
          if (x.full_name.includes('Philadelphia')) x.full_name = 'Philadelphia Sixers';
          if (x.full_name.includes('Clippers')) x.full_name = 'Los Angeles Clippers';
          return x;
        });
        // INNER 1 - Transactions
        this.apiService.firebaseDbFetch(dbTarget.nba.transactions).subscribe({
          next: (data) => {
            let temp = data.slice();
            temp.shift();
            this.transactionsALL = temp;
            // this.transactionsALL = data;
            console.log(this.transactionsALL);
            console.log(this.transactionsALL![1]);
            console.log(this.teamsALL);
            
            // console.log(this.transactionsALL![0]);
            this.isLoading = false;
          },
          error: (err) => {
            this.errorOccurred = true;
            console.log(err);
            this.isLoading = false;
          },
          complete: () => this.unsubscribed = true,
        });
      },
      error: (err) => console.log(err),
      complete: () => console.log('Data fetched'),
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
