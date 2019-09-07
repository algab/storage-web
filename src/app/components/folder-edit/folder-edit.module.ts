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
} from '@angular/material';

import { FolderEditComponent } from './folder-edit.component';

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
    ],
    declarations: [FolderEditComponent],
    entryComponents: [FolderEditComponent],
    exports: [FolderEditComponent]
})

export class FolderEditModule { }
