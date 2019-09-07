import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES } from './routes-sidebar';

declare const $: any;

@Component({
    selector: 'app-dashboard-sidebar',
    templateUrl: './dashboard-sidebar.component.html'
})
export class DashboardSidebarComponent implements OnInit {
    menuItems: any[];

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
        this.router.navigateByUrl('/dashboard/password');
    }

    exit() {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/');
    }
}
