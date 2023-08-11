import { Component } from '@angular/core';
import { NbaApiService } from '../nba-api.service';
import { ActivatedRoute } from '@angular/router';
import { StatsAdvanced, StatsAverages, StatsMisc, StatsTotals, Team } from '../nba-types';
import { dbTarget } from 'src/app/util/global-constants';

@Component({
  selector: 'app-team-item-stats',
  templateUrl: './team-item-stats.component.html',
  styleUrls: ['./team-item-stats.component.css']
})
export class TeamItemStatsComponent {
  constructor(private apiService: NbaApiService, private route: ActivatedRoute) { }

  teamsALL: Team[] | null = null;
  currentTeam: Team | undefined;
  stats: {
    advanced: StatsAdvanced | StatsAdvanced[] | any, averages: StatsAverages | StatsAverages[] | any,
    misc: StatsMisc | StatsMisc[] | any, totals: StatsTotals | StatsTotals[] | any,
  } = { advanced: [], averages: [], misc: [], totals: [] };
  routeID: string | number | null = null;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.routeID = this.route.snapshot.paramMap.get('id');
    // console.log(this.routeID);
    // OUTER 1 - Teams
    this.apiService.firebaseDbFetch(dbTarget.nba.teamsAPI).subscribe({
      next: (data) => {
        this.teamsALL = data;
        this.teamsALL!.map((x) => {
          if (x.full_name.includes('Philadelphia')) x.full_name = 'Philadelphia Sixers';
          if (x.full_name.includes('Clippers')) x.full_name = 'Los Angeles Clippers';
          if (x.name == '76ers') x.name = 'sixers';
          return x;
        });
        this.currentTeam = this.teamsALL!.find(x => x.id == this.routeID)
        // console.log(this.currentTeam);
        // INNER 2 - Advanced
        this.apiService.firebaseDbFetch(dbTarget.nba.teamStats.advanced).subscribe({
          next: (data: StatsAdvanced[]) => {
            Object.entries(data).forEach(([i, v]) => {
              if (v['Team'].includes('L.A.')) {
                v['Team'] = v['Team'].substring(5);
              }
              if (this.currentTeam!.full_name.includes(v['Team'])) {
                // v['id'] = this.currentTeam!.id.toString();
                this.stats.advanced = v;
                // console.log(arr);
              }
            });
            // console.log(this.stats);
            this.isLoading = false;
          },
          error: (err) => {
            this.errorOccurred = true;
            console.log(err);
            this.isLoading = false;
          },
          complete: () => {
            this.unsubscribed = true;
          },
        });
        // INNER 3 - Averages
        this.apiService.firebaseDbFetch(dbTarget.nba.teamStats.averages).subscribe({
          next: (data: StatsAverages[]) => {
            Object.entries(data).forEach(([i, v]) => {
              if (v['Team'].includes('L.A.')) {
                v['Team'] = v['Team'].substring(5);
              }
              if (this.currentTeam!.full_name.includes(v['Team'])) {
                // v['id'] = this.currentTeam!.id.toString();
                this.stats.averages = v;
                // console.log(arr);
              }
            });
            // console.log(this.stats);
            this.isLoading = false;
          },
          error: (err) => {
            this.errorOccurred = true;
            console.log(err);
            this.isLoading = false;
          },
          complete: () => {
            this.unsubscribed = true;
          },
        });
        // INNER 4 - Misc
        this.apiService.firebaseDbFetch(dbTarget.nba.teamStats.misc).subscribe({
          next: (data: StatsMisc[]) => {
            Object.entries(data).forEach(([i, v]) => {
              if (v['Team'].includes('L.A.')) {
                v['Team'] = v['Team'].substring(5);
              }
              if (this.currentTeam!.full_name.includes(v['Team'])) {
                // v['id'] = this.currentTeam!.id.toString();
                this.stats.misc = v;
                // console.log(arr);
              }
            });
            // console.log(this.stats);
            this.isLoading = false;
          },
          error: (err) => {
            this.errorOccurred = true;
            console.log(err);
            this.isLoading = false;
          },
          complete: () => {
            this.unsubscribed = true;
          },
        });
        // INNER 5 - Totals
        this.apiService.firebaseDbFetch(dbTarget.nba.teamStats.totals).subscribe({
          next: (data: StatsTotals[]) => {
            Object.entries(data).forEach(([i, v]) => {
              if (v['Team'].includes('L.A.')) {
                v['Team'] = v['Team'].substring(5);
              }
              if (this.currentTeam!.full_name.includes(v['Team'])) {
                // v['id'] = this.currentTeam!.id.toString();
                this.stats.totals = v;
                // console.log(arr);
              }
            });
            // console.log(this.stats);
            this.isLoading = false;
          },
          error: (err) => {
            this.errorOccurred = true;
            console.log(err);
            this.isLoading = false;
          },
          complete: () => {
            this.unsubscribed = true;
          },
        });
        // END OF INNER FETCH CHAIN 
      },
      error: (err) => { console.log(err) },
      complete: () => {
        // console.log('Teams data fetched!');
      },
    });
  };
}
