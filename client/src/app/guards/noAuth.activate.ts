import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../user/auth.service";


@Injectable({ providedIn: 'root' })
export class NoAuthActivate implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
        boolean | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {

        
        if (localStorage.getItem('user')) {
            this.router.navigate(['/dashboard']);
            alert('You are already logged in. Redirecting you to the dashboard!');
            return false;
        } else {
            return true;
        }
    }

}