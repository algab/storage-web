import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FoldersComponent } from './folders/folders.component';
import { FilesComponent } from './files/files.component';
import { FilesFolderComponent } from './files/folder/files-folder.component';
import { SettingComponent } from './setting/setting.component';
import { DashboardComponent } from './dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { AuthGuardSerivce } from 'app/utils/guard/auht-guard.service';

export const DashboardRoutes: Routes = [
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardSerivce],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'folders', component: FoldersComponent },
            { path: 'files', component: FilesComponent },
            { path: 'files/folder/:name', component: FilesFolderComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'setting', component: SettingComponent },
            { path: 'password', component: ChangePasswordComponent }
        ]
    }
];
