import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersComponent } from './players/players.component';
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
import { TeamItemStatsComponent } from './team-item-stats/team-item-stats.component';
import { TeamItemRosterComponent } from './team-item-roster/team-item-roster.component';
import { StandingsWestComponent } from './standings-west/standings-west.component';
import { StandingsEastComponent } from './standings-east/standings-east.component';
import { StarLoaderComponent } from './star-loader/star-loader.component';


@NgModule({
  declarations: [
    PlayersComponent,
    StandingsComponent,
    TeamsComponent,
    TransactionsComponent,
    NewsComponent,
    AnalysisComponent,
    NewsItemComponent,
    AnalysisItemComponent,
    PlayerItemComponent,
    TeamItemComponent,
    TeamItemStatsComponent,
    TeamItemRosterComponent,
    StandingsWestComponent,
    StandingsEastComponent,
    StarLoaderComponent,
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
    StandingsComponent,
    TeamsComponent,
    TransactionsComponent,
    NewsComponent,
    AnalysisComponent,
    NewsItemComponent,
    AnalysisItemComponent,
    PlayerItemComponent,
    TeamItemComponent,
    TeamItemStatsComponent,
    TeamItemRosterComponent,
    StandingsWestComponent,
    StandingsEastComponent,
    StarLoaderComponent,
  ],
})
export class NbaModule { }
