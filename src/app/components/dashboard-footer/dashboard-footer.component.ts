import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard-footer',
    templateUrl: './dashboard-footer.component.html',
    styles: [`
        .footer-dashboard {
            background-color: whitesmoke;
        }
    `]
})
export class DashboardFooterComponent {
    public dateFooter = new Date();

    constructor() { }
}
