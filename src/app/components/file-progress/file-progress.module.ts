import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule
} from '@angular/material';

import { FileProgressComponent } from './file-progress.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule,
        MatProgressBarModule
    ],
    declarations: [FileProgressComponent],
    entryComponents: [FileProgressComponent],
    exports: [FileProgressComponent]
})

export class FileProgressModule { }
