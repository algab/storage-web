import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatRippleModule, MatIconModule } from '@angular/material';

import { DashboardSidebarComponent } from './dashboard-sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatRippleModule,
        MatIconModule,
    ],
    declarations: [DashboardSidebarComponent],
    entryComponents: [DashboardSidebarComponent],
    exports: [DashboardSidebarComponent]
})

export class DashboardSidebarModule { }
