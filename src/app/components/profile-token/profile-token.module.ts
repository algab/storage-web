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

import { ProfileTokenComponent } from './profile-token.component';

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
    declarations: [ProfileTokenComponent],
    entryComponents: [ProfileTokenComponent],
    exports: [ProfileTokenComponent]
})

export class ProfileTokenModule { }
