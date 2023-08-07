import { Component } from '@angular/core';
import { Links, Player, StatsAdvanced, StatsAverages, StatsMisc, StatsTotals, Team } from '../nba-types';
import { NbaApiService } from '../nba-api.service';
import { ActivatedRoute } from '@angular/router';
import { dbTarget } from 'src/app/util/global-constants';

@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.css']
})
export class TeamItemComponent {
  constructor(private apiService: NbaApiService, private route: ActivatedRoute) { }

  playersALL: Player[] | null = null;
  teamsALL: Team[] | null = null;
  currentTeam: Team | undefined;
  currentLinks: Links | undefined;
  stats: {
    advanced: null | StatsAdvanced, averages: null | StatsAverages,
    misc: null | StatsMisc, totals: null | StatsTotals,
  } = { advanced: null, averages: null, misc: null, totals: null };
  routeID: string | number | null = null;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.routeID = this.route.snapshot.paramMap.get('id');
    // console.log(this.routeID);
    this.apiService.nbaFetch('teams').subscribe({
      next: (data) => {
        this.teamsALL = data.data;
        this.teamsALL!.map((x) => {
          if (x.full_name.includes('Philadelphia')) x.full_name = 'Philadelphia Sixers';
          if (x.full_name.includes('Clippers')) x.full_name = 'Los Angeles Clippers';
          return x;
        });
        this.currentTeam = this.teamsALL!.find(x => x.id == this.routeID)
        console.log(this.currentTeam);
        // INNER 1
        this.apiService.firebaseDbFetch(dbTarget.nba.teamLinks).subscribe({
          next: (data: Links[]) => {
            this.currentLinks = data.find(x => this.currentTeam!.full_name.toLowerCase().includes(x.name));
            // console.log(this.currentLinks);
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
        // INNER 2
        this.apiService.firebaseDbFetch(dbTarget.nba.teamStats.advanced).subscribe({
          next: (data: StatsAdvanced[]) => {
            Object.entries(data).forEach(([i, v]) => {
              if (v['Team'].includes('L.A.')) {
                v['Team'] = v['Team'].substring(5);
              }
              if (this.currentTeam!.full_name.includes(v['Team'])) {
                v['id'] = this.currentTeam!.id.toString();
                this.stats.advanced = v;
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
        // INNER 3
        this.apiService.firebaseDbFetch(dbTarget.nba.teamStats.advanced).subscribe({
          next: (data: StatsAverages[]) => {
            Object.entries(data).forEach(([i, v]) => {
              if (v['Team'].includes('L.A.')) {
                v['Team'] = v['Team'].substring(5);
              }
              if (this.currentTeam!.full_name.includes(v['Team'])) {
                v['id'] = this.currentTeam!.id.toString();
                this.stats.averages = v;
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


      },
      error: (err) => { console.log(err) },
      complete: () => {
        // console.log('Teams data fetched!');
      },
    });
  };
}
