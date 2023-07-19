import { NgModule, Inject } from '@angular/core';
import { NavigationSkipped, NavigationStart, Router, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { PlayersComponent } from './nba/players/players.component';
import { DOCUMENT } from '@angular/common';


const routes: Routes = [ // UPPER/LOWER CASE MATTERS !!!!!!! routerLink in the html should MATCH IT!!!
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'players', component: PlayersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {
    router.events.subscribe((event) => {
      // console.log(event);
      if (event instanceof NavigationStart || event instanceof NavigationSkipped) {
        // console.log('path change');
        if (window.innerWidth <= 768) {
          this.aside().style.display = 'none';
        }
      }
    });
  }

  aside = () => this.document.body.querySelector('aside')!;

}
