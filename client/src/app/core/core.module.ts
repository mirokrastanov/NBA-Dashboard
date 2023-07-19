import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { TopNavComponent } from './top-nav/top-nav.component';



@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    TopNavComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    DashboardComponent,
    SidebarComponent,
    TopNavComponent,
  ],
})
export class CoreModule { }
