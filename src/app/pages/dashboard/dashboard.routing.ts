import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FolderComponent } from './folder/folder.component';
import { FilesComponent } from './files/files.component';
import { FilesFolderComponent } from './files/folder/files-folder.component';
import { DashboardComponent } from './dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { AuthGuardSerivce } from 'app/utils/guard/auth-guard.service';

export const DashboardRoutes: Routes = [
    {
        path: '', component: DashboardComponent, canActivate: [AuthGuardSerivce],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'folders', component: FolderComponent },
            { path: 'files', component: FilesComponent },
            { path: 'files/folder/:name', component: FilesFolderComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'password', component: ChangePasswordComponent }
        ]
    }
];
