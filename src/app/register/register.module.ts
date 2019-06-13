import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatTabsModule,
    MatCardModule,
    MatSnackBarModule
} from '@angular/material'

import { RegisterRoutes } from "./register.routing";

import { RegisterHeaderComponent } from "./header/register-header.component";
import { RegisterUserComponent } from "./user/register-user.component";
import { RegisterBucketComponent } from "./bucket/register-bucket.component";

@NgModule({
    declarations: [
        RegisterHeaderComponent,
        RegisterUserComponent,
        RegisterBucketComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MatCardModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatTabsModule,
        MatSnackBarModule,
        RouterModule.forChild(RegisterRoutes)
    ]
})
export class RegisterModule { }