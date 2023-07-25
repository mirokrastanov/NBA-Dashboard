import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { TopNavComponent } from './top-nav/top-nav.component';
import { RouterModule } from '@angular/router';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    TopNavComponent,
    GlobalLoaderComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    DashboardComponent,
    SidebarComponent,
    TopNavComponent,
    GlobalLoaderComponent,
    ErrorComponent,
  ],
})
export class CoreModule { }
