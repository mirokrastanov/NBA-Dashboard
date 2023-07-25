import { NgModule, Inject } from '@angular/core';
import { NavigationSkipped, NavigationStart, Router, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { DOCUMENT } from '@angular/common';
import { LoginComponent } from './user/login/login.component';
import { ErrorComponent } from './core/error/error.component';


const routes: Routes = [ // UPPER/LOWER CASE MATTERS !!!!!!! routerLink in the html should MATCH IT!!!
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'nba', component: DashboardComponent },
  { path: 'user', component: LoginComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {
    this.router.events.subscribe((event) => {
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
