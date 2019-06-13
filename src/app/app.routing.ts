import { ModuleWithProviders } from '@angular/compiler/src/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'user', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes)
