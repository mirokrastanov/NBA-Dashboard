import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from '../core/error/error.component';
import { AuthActivate } from '../guards/auth.activate';
import { NoAuthActivate } from '../guards/noAuth.activate';

const routes: Routes = [
    {
        path: 'user',
        children: [
            { path: '', component: ErrorComponent },
            { path: 'login', component: LoginComponent, canActivate: [NoAuthActivate] },
            { path: 'register', component: RegisterComponent, canActivate: [NoAuthActivate] },
            { path: 'profile', component: ProfileComponent, canActivate: [AuthActivate] },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule { }
