import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatTabsModule,
  MatSnackBarModule,
  MatCardModule,
  MatDialogModule
} from '@angular/material'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { LoginComponent, DialogLoginPasswordComponent } from './pages/login/login.component';

import { InterceptorModule } from './utils/auth/interceptor.module';
import { AuthGuardSerivce } from './utils/guard/auth-guard.service';

import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    AppRoutingModule,
    InterceptorModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DialogLoginPasswordComponent
  ],
  entryComponents: [DialogLoginPasswordComponent],
  providers: [AuthGuardSerivce],
  bootstrap: [AppComponent]
})
export class AppModule { }
