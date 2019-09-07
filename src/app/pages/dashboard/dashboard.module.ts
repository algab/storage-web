import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatTabsModule,
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatCheckboxModule
} from '@angular/material';

import { HomeComponent } from './home/home.component';
import { FolderComponent } from './folder/folder.component';
import { FolderSaveComponent } from './folder/save/folder-save.component';
import { FolderOptionComponent } from './folder/option/folder-option.component';
import { FilesComponent } from './files/files.component';
import { FilesFolderComponent } from './files/folder/files-folder.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { DashboardComponent } from './dashboard.component';

import { DashboardSidebarModule } from 'app/components/dashboard-sidebar/dashboard-sidebar.module';
import { DashboardNavbarModule } from 'app/components/dashboard-navbar/dashboard-navbar.module';
import { DashboardFooterModule } from 'app/components/dashboard-footer/dashboard-footer.module';
import { FolderEditModule } from 'app/components/folder-edit/folder-edit.module';
import { FolderDeleteModule } from 'app/components/folder-delete/folder-delete.module';
import { FileViewModule } from 'app/components/file-view/file-view.module';
import { FileDeleteModule } from 'app/components/file-delete/file-delete.module';
import { FileProgressModule } from 'app/components/file-progress/file-progress.module';
import { ProfileTokenModule } from 'app/components/profile-token/profile-token.module';

import { DashboardRoutes } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatCheckboxModule,
    FolderEditModule,
    FolderDeleteModule,
    DashboardSidebarModule,
    DashboardNavbarModule,
    DashboardFooterModule,
    FileViewModule,
    FileDeleteModule,
    FileProgressModule,
    ProfileTokenModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [
    DashboardComponent,
    HomeComponent,
    FolderComponent,
    FolderSaveComponent,
    FolderOptionComponent,
    FilesComponent,
    FilesFolderComponent,
    ProfileComponent,
    ChangePasswordComponent,
  ],
})

export class DashboardModule { }
