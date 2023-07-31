import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../user/auth.service";


@Injectable({ providedIn: 'root' })
export class AuthActivate implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
        boolean | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {

        if (localStorage.getItem('user')) {
            this.authService.authStatusListener();
            return true;
        } else {
            this.router.navigate(['/user/login']);
            alert('You must be logged in to view this page!');
            return false;
        }
    }

}