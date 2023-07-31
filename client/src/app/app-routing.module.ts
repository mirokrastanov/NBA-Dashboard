import { NgModule, Inject } from '@angular/core';
import { NavigationSkipped, NavigationStart, Router, RouterModule, Routes } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ErrorComponent } from './core/error/error.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { AuthService } from './user/auth.service';


const routes: Routes = [ // UPPER/LOWER CASE MATTERS !!!!!!! routerLink in the html should MATCH IT!!!
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },


  { path: '**', component: ErrorComponent }, // SHOULD REMAIN LAST !!!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router, @Inject(DOCUMENT) private document: Document, private authService: AuthService) {
    this.router.events.subscribe((event) => {
      // console.log(event);
      if (event instanceof NavigationStart || event instanceof NavigationSkipped) {
        // console.log('path change');
        if (window.innerWidth <= 768) {
          this.aside().style.display = 'none';
        }

        this.authService.authStatusListener();
        console.log('Authenticated: ', authService.currentUser != null ? true : false);
      }
    });
  }

  aside = () => this.document.body.querySelector('aside')!;

}
