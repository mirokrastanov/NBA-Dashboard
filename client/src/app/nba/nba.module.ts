import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersComponent } from './players/players.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { SharedModule } from '../shared/shared.module';
import { StandingsComponent } from './standings/standings.component';
import { TeamsComponent } from './teams/teams.component';
import { UserModule } from '../user/user.module';
import { NbaRoutingModule } from './nba-routing.module';
import { CoreModule } from '../core/core.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { NewsComponent } from './news/news.component';
import { AnalysisComponent } from './analysis/analysis.component';


@NgModule({
  declarations: [
    PlayersComponent,
    PlayerDetailsComponent,
    StandingsComponent,
    TeamsComponent,
    TransactionsComponent,
    NewsComponent,
    AnalysisComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserModule,
    NbaRoutingModule,
    CoreModule,
  ],
  exports: [
    PlayersComponent,
    PlayerDetailsComponent,
    StandingsComponent,
    TeamsComponent,
    TransactionsComponent,
    NewsComponent,
    AnalysisComponent,
  ],
})
export class NbaModule { }
