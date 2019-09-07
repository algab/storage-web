import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardNavbarComponent } from './dashboard-navbar.component';

@NgModule({
    imports: [CommonModule],
    declarations: [DashboardNavbarComponent],
    entryComponents: [DashboardNavbarComponent],
    exports: [DashboardNavbarComponent]
})

export class DashboardNavbarModule { }
