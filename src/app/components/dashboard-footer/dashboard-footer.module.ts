import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardFooterComponent } from './dashboard-footer.component';

@NgModule({
    imports: [CommonModule],
    declarations: [DashboardFooterComponent],
    entryComponents: [DashboardFooterComponent],
    exports: [DashboardFooterComponent]
})

export class DashboardFooterModule { }
