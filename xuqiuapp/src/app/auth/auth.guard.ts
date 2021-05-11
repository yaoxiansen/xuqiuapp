import { LoginService } from 'xq-lib';
import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, NavigationExtras, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(public loginService: LoginService,
                public route: ActivatedRoute,
                public router: Router) {
    }
    canActivateChild(
                    childRoute: ActivatedRouteSnapshot, 
                    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return true;
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const url = state.url;
        // return false;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if(this.loginService.isLogined) {
            return true;
        }
        this.loginService.redirectUrl = url;
        const sessionId = this.route.snapshot.paramMap.get('session_id');
        const navigationExtras: NavigationExtras = {
            queryParams: {session_id: sessionId},
            fragment: 'anchor'
        }
        this.router.navigate(['/home'], navigationExtras);
        return false;
    }
    
}