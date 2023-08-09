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
    this.apiService.firebaseDbFetch(dbTarget.nba.teamsAPI).subscribe({
      next: (data) => {
        this.teamsALL = data;
        this.teamsALL!.map((x) => {
          if (x.full_name.includes('Philadelphia')) x.full_name = 'Philadelphia Sixers';
          if (x.full_name.includes('Clippers')) x.full_name = 'Los Angeles Clippers';
          return x;
        });
        this.isLoading = false;

        // INNER 1 - Transactions
        this.apiService.firebaseDbFetch(dbTarget.nba.transactions).subscribe({
          next: (data) => {
            this.transactionsALL = data;
            // console.log(this.transactionsALL);
            // console.log(this.transactionsALL![1].lines[0].tags);
            // console.log(this.teamsALL);
            for (let i = 0; i < this.transactionsALL!.length; i++) {
              const transaction = this.transactionsALL![i];
              for (let j = 0; j < transaction.lines.length; j++) {
                const line = transaction.lines[j];
                for (let k = 0; k < line.tags.length; k++) {
                  const tag = line.tags[k];
                  let isTeam = this.teamsALL!.find((team) => (team.full_name.trim().toLowerCase().includes(tag.trim().toLowerCase())));

                  if (isTeam) {
                    // this.transactionsALL![i].lines[j].tags[k] = `${tag}----team----${isTeam.id}`;
                    this.transactionsALL![i].lines[j].tags[k] = ['team', tag, isTeam.id];
                  } else {
                    // this.transactionsALL![i].lines[j].tags[k] = `${tag}----player`;
                    if (line.body.toLowerCase().includes('free agent')
                      || (line.body.toLowerCase().includes('ended') && line.body.toLowerCase().includes('contract'))) {
                      this.transactionsALL![i].lines[j].tags[k] = ['player', tag, 'free'];
                    } else {
                      this.transactionsALL![i].lines[j].tags[k] = ['player', tag, 'not'];
                    }
                  }
                }
              }
            }
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
      complete: () => { },
    });
  }



}
