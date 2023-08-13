import { NgModule, Inject } from '@angular/core';
import { NavigationSkipped, NavigationStart, Router, RouterModule, Routes } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ErrorComponent } from './core/error/error.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { AuthService } from './user/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


const routes: Routes = [ // UPPER/LOWER CASE MATTERS !!!!!!! routerLink in the html should MATCH IT!!!
  { path: '', component: DashboardComponent },
  { path: 'dashboard', redirectTo: '/', pathMatch: 'full' },


  { path: '**', component: ErrorComponent }, // SHOULD REMAIN LAST !!!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  aside = () => this.document.body.querySelector('aside')!;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private fireAuth: AngularFireAuth,
  ) {
    this.router.events.subscribe((event) => {
      // console.log(event);
      if (event instanceof NavigationStart || event instanceof NavigationSkipped) {
        // console.log('path change');
        if (window.innerWidth <= 768) {
          this.aside().style.display = 'none';
        }

        this.authService.authStatusListener();
        // FOR TESTING
        fireAuth.onAuthStateChanged(async (crendetial) => {
          if (crendetial) {
            // console.log(crendetial);
            // console.log(crendetial.uid);
            
            // console.log('Authenticated: ', authService.currentUser != null ? true : false);
          }
        })
      }
    });
  }
}
