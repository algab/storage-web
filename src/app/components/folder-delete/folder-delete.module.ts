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

import { FolderDeleteComponent } from './folder-delete.component';

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
    declarations: [FolderDeleteComponent],
    entryComponents: [FolderDeleteComponent],
    exports: [FolderDeleteComponent]
})

export class FolderDeleteModule { }
