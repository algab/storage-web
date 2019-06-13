import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES } from './routes-sidebar';

declare const $: any;

@Component({
    selector: 'app-dashboard-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: RouteInfo[];

    constructor(private router: Router) { }

    ngOnInit() {
        this.menuItems = ROUTES;
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    changePassword() {
        this.router.navigateByUrl("/user/dashboard/password")
    }

    exit() {
        localStorage.removeItem('user')
        this.router.navigateByUrl("/");
    }
}
