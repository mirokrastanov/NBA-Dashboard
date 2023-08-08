import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingsComponent } from './standings/standings.component';
import { TeamsComponent } from './teams/teams.component';
import { PlayersComponent } from './players/players.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NewsComponent } from './news/news.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { ErrorComponent } from '../core/error/error.component';
import { AuthActivate } from '../guards/auth.activate';
import { NewsItemComponent } from './news-item/news-item.component';
import { AnalysisItemComponent } from './analysis-item/analysis-item.component';
import { PlayerItemComponent } from './player-item/player-item.component';
import { TeamItemComponent } from './team-item/team-item.component';
import { TeamItemStatsComponent } from './team-item-stats/team-item-stats.component';
import { TeamItemRosterComponent } from './team-item-roster/team-item-roster.component';

const routes: Routes = [
    {
        path: 'nba',
        children: [
            { path: '', component: ErrorComponent },
            { path: 'standings', component: StandingsComponent },
            { path: 'teams', component: TeamsComponent },
            { path: 'teams/:id', component: TeamItemComponent },
            { path: 'teams/:id/stats', component: TeamItemStatsComponent },
            { path: 'teams/:id/roster', component: TeamItemRosterComponent },
            { path: 'players', redirectTo: '/nba/players/page/1', pathMatch: 'full' },
            { path: 'players/page/:num', component: PlayersComponent },
            { path: 'players/player/:name', component: PlayerItemComponent },
            { path: 'transactions', component: TransactionsComponent, canActivate: [AuthActivate] },
            { path: 'news', component: NewsComponent, canActivate: [AuthActivate] },
            { path: 'news/:id', component: NewsItemComponent, canActivate: [AuthActivate] },
            { path: 'analysis', component: AnalysisComponent, canActivate: [AuthActivate] },
            { path: 'analysis/:id', component: AnalysisItemComponent, canActivate: [AuthActivate] },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NbaRoutingModule { }
