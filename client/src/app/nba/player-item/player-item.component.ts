import { Component } from '@angular/core';
import { NbaApiService } from '../nba-api.service';
import { Player, Team } from '../nba-types';
import { ActivatedRoute } from '@angular/router';
import { dbTarget } from 'src/app/util/global-constants';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-player-item',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.css']
})
export class PlayerItemComponent {
  constructor(
    private apiService: NbaApiService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  playersALL: Player[] | null = null;
  teamsALL: Team[] | null = null;
  routeName: string | null = null;
  currentPlayer: Player | null = null;
  teamID: string | number | null = null;
  unsubscribed: boolean = false;
  errorOccurred: boolean = false;
  isLoading: boolean = true;
  starIsLoading: boolean = true;
  isFavorite: boolean = false;
  get currentUser() {
    return this.authService.currentUser;
  }

  ngOnInit(): void {
    this.routeName = this.route.snapshot.paramMap.get('name');
    // console.log(this.routeName);

    this.apiService.firebaseDbFetch(dbTarget.nba.teamsAPI).subscribe({
      next: (data) => {
        this.teamsALL = data;
        this.teamsALL!.map((x) => {
          if (x.full_name.includes('Philadelphia')) x.full_name = 'Philadelphia Sixers';
          if (x.full_name.includes('Clippers')) x.full_name = 'Los Angeles Clippers';
          return x;
        });
        this.apiService.firebaseDbFetch(dbTarget.nba.players).subscribe({
          next: (data: Player[]) => {
            this.playersALL = data.slice();
            let player: Player[] | undefined;
            player = this.playersALL!.filter(x => x['Player']!.toLowerCase() == this.routeName!.toLowerCase());
            player.map((x) => {
              let teamID = this.teamsALL!.find(y => y.full_name == x['Current Team'])?.id;
              x['teamID'] = String(teamID);
              this.teamID = teamID!;
              return x;
            });
            this.currentPlayer = player[0];
            this.fetchFavorites();
            // console.log(this.currentPlayer);
            this.isLoading = false;
          },
          error: (err) => {
            this.errorOccurred = true;
            console.log(err);
            this.isLoading = false;
          },
          complete: () => {
            this.unsubscribed = true;
            // console.log('Players data fetched!');
          },
        });
      },
      error: (err) => { console.log(err) },
      complete: () => {
        // console.log('Teams data fetched!');
      },
    });
  };

  fetchFavorites(): void {
    if (!this.currentUser) return;
    this.starIsLoading = true;
    this.apiService.getFavorites().subscribe({
      next: (data) => {
        let temp = Object.keys(data!.players).filter(x => x != 'service').join('||||');
        let favPlayers = this.apiService.decodeStarName(temp).split('||||');
        if (favPlayers?.length == 0 || !favPlayers) {
          this.isFavorite = false;
        } else {
          if (favPlayers!.find(x => this.currentPlayer!['Player'] == x)!?.length > 0) {
            this.isFavorite = true;
          } else {
            this.isFavorite = false;
          }
        }
        this.starIsLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.starIsLoading = false;
      },
    });
  }

  onFavPlayer(e: MouseEvent): void {
    this.apiService.addFavoritePlayer(this.currentPlayer!['Player']);
    this.starIsLoading = true;
    setTimeout(() => {
      this.fetchFavorites();
      this.starIsLoading = false;
    }, 1000);
  }

  onUNfavPlayer(e: MouseEvent): void {
    this.apiService.removeFavoritePlayer(this.currentPlayer!['Player']);
    this.starIsLoading = true;
    setTimeout(() => {
      this.fetchFavorites();
      this.starIsLoading = false;
    }, 1000);
  }


}
