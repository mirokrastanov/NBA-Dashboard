import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../core/dashboard/dashboard.component';
import { StandingsComponent } from './standings/standings.component';
import { TeamsComponent } from './teams/teams.component';
import { PlayersComponent } from './players/players.component';

const routes: Routes = [
    {
        path: 'nba',
        children: [
            { path: '', component: DashboardComponent },
            { path: 'standings', component: StandingsComponent },
            { path: 'teams', component: TeamsComponent },
            { path: 'players', component: PlayersComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NbaRoutingModule { }
