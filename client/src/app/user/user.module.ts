import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { MinCountDirective } from './directives/min-count.directive';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MinCountDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    

    UserRoutingModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  ],
})
export class UserModule { }
