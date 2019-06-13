import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AuthGuardSerivce implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        if (localStorage.getItem('user') != null) {
            try {
                let token = JSON.parse(localStorage.getItem('user')).token
                if (token != null) {
                    return true;
                }
                else {
                    this.router.navigateByUrl("/");
                    return false;
                }
            } catch (error) {
                this.router.navigateByUrl("/");
                return false;
            }
        }
        else {
            this.router.navigateByUrl("/");
            return false;
        }
    }
}