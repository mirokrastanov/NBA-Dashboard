import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersComponent } from './players/players.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { StandingsComponent } from './standings/standings.component';
import { TeamsComponent } from './teams/teams.component';
import { UserModule } from '../user/user.module';


@NgModule({
  declarations: [
    PlayersComponent,
    PlayerDetailsComponent,
    StandingsComponent,
    TeamsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UserModule,
  ],
  exports: [
    PlayersComponent,
    PlayerDetailsComponent,
    StandingsComponent,
    TeamsComponent,
  ],
})
export class NbaModule { }
