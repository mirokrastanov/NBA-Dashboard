import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingsComponent } from './standings/standings.component';
import { TeamsComponent } from './teams/teams.component';
import { PlayersComponent } from './players/players.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NewsComponent } from './news/news.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { ErrorComponent } from '../core/error/error.component';

const routes: Routes = [
    {
        path: 'nba',
        children: [
            { path: '', component: ErrorComponent },
            { path: 'standings', component: StandingsComponent },
            { path: 'teams', component: TeamsComponent },
            { path: 'players', component: PlayersComponent },
            { path: 'transactions', component: TransactionsComponent },
            { path: 'news', component: NewsComponent },
            { path: 'analysis', component: AnalysisComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NbaRoutingModule { }
