import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { MinCountDirective } from './directives/min-count.directive';
import { SharedModule } from "../shared/shared.module";
import { MaxCountDirective } from './directives/max-count.directive';
import { ProfileLoaderComponent } from './profile-loader/profile-loader.component';



@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        MinCountDirective,
        MaxCountDirective,
        ProfileLoaderComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        UserRoutingModule,
    ],
    exports: [
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        MinCountDirective,
        MaxCountDirective,
        ProfileLoaderComponent,
    ],
})
export class UserModule { }
