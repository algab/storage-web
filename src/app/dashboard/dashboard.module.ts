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

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FoldersComponent } from './folders/folders.component';
import { FoldersSaveComponent } from './folders/save/folders-save.component';
import { FoldersOptionComponent, DialogFolderDelete, DialogFolderEdit } from './folders/option/folders-option.component';
import { FilesComponent, DialogFilesProgress, DialogFilesDelete, DialogFilesView } from './files/files.component';
import { FilesFolderComponent, DialogFoldersListView, DialogFoldersListProgress, DialogFoldersListDelete } from './files/folder/files-folder.component';
import { SettingComponent, DialogSettingToken } from './setting/setting.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { DashboardComponent } from './dashboard.component';

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
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    FoldersComponent,
    FoldersSaveComponent,
    FoldersOptionComponent,
    FilesComponent,
    FilesFolderComponent,
    SettingComponent,
    ChangePasswordComponent,
    DialogFolderEdit,
    DialogFolderDelete,
    DialogFoldersListView,
    DialogFoldersListProgress,
    DialogFoldersListDelete,
    DialogFilesView,
    DialogFilesDelete,
    DialogFilesProgress,
    DialogSettingToken
  ],
  entryComponents: [
    DialogFolderEdit,
    DialogFolderDelete,
    DialogFoldersListView,
    DialogFoldersListProgress,
    DialogFoldersListDelete,
    DialogFilesView,
    DialogFilesDelete,
    DialogFilesProgress,
    DialogSettingToken
  ]
})

export class DashboardModule {}
