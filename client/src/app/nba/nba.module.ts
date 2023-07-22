import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersComponent } from './players/players.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { StandingsComponent } from './standings/standings.component';


@NgModule({
  declarations: [
    PlayersComponent,
    PlayerDetailsComponent,
    StandingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    PlayersComponent,
    PlayerDetailsComponent,
  ],
})
export class NbaModule { }
