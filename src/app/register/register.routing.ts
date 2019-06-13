import { Routes } from "@angular/router";

import { RegisterUserComponent } from "./user/register-user.component";
import { RegisterBucketComponent } from "./bucket/register-bucket.component";

import { AuthGuardSerivce } from "app/utils/guard/auht-guard.service";

export const RegisterRoutes: Routes = [
    { path: 'user', component: RegisterUserComponent },
    { path: 'bucket', component: RegisterBucketComponent, canActivate:[AuthGuardSerivce] }
]