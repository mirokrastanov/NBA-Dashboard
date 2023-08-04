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
import { NewsItemComponent } from './news-item/news-item.component';
import { AnalysisItemComponent } from './analysis-item/analysis-item.component';
import { PlayerItemComponent } from './player-item/player-item.component';
import { TeamItemComponent } from './team-item/team-item.component';


@NgModule({
  declarations: [
    PlayersComponent,
    PlayerDetailsComponent,
    StandingsComponent,
    TeamsComponent,
    TransactionsComponent,
    NewsComponent,
    AnalysisComponent,
    NewsItemComponent,
    AnalysisItemComponent,
    PlayerItemComponent,
    TeamItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserModule,
    CoreModule,
    NbaRoutingModule,
  ],
  exports: [
    PlayersComponent,
    PlayerDetailsComponent,
    StandingsComponent,
    TeamsComponent,
    TransactionsComponent,
    NewsComponent,
    AnalysisComponent,
    NewsItemComponent,
    AnalysisItemComponent,
    PlayerItemComponent,
    TeamItemComponent,
  ],
})
export class NbaModule { }
