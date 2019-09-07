import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';

import { LoginService } from './login.service';

@Component({
    selector: 'app-dialog-login-password',
    template: `
    <h1 mat-dialog-title>Recuperar Senha</h1>
    <div mat-dialog-content>
        <mat-form-field>
            <input matInput [(ngModel)]="name" type="email" name="email" placeholder="Digite o seu email">
        </mat-form-field>
    </div>
    <div mat-dialog-actions>
        <button mat-button [mat-dialog-close]="name" cdkFocusInitial>Enviar</button>
        <button mat-button (click)="close()">Cancelar</button>
    </div>
    `
})
export class DialogLoginPasswordComponent {
    name: string

    constructor(public dialogRef: MatDialogRef<LoginComponent>) { }

    close() {
        this.dialogRef.close()
    }
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    private formLogin: FormGroup

    constructor(
        private router: Router,
        private form: FormBuilder,
        private service: LoginService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) {
        this.formLogin = this.form.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }


    login() {
        this.service.login(this.formLogin.get('email').value, this.formLogin.get('password').value).subscribe(data => {
            localStorage.setItem('user', JSON.stringify(data));
            this.router.navigateByUrl('/dashboard/home');
        }, err => {
            if (err.status === 404) {
                this.formLogin.controls['email'].setErrors({ 'incorrect': true });
                this.formLogin.controls['password'].setErrors({ 'incorrect': true });
                this.snackBar.open('Email ou senha incorretos.', 'FECHAR', {
                    duration: 2000
                });
            } else {
                this.snackBar.open('Por favor, tente novamente mais tarde.', 'FECHAR', {
                    duration: 2000
                });
            }
        })
    }

    register() {
        this.router.navigateByUrl('/register');
    }

    password() {
        const dialogRef = this.dialog.open(DialogLoginPasswordComponent, {
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(email => {
            if (email != null) {
                this.service.resetPassword(email).subscribe(() => {
                    this.snackBar.open('Email enviado com sucesso.', 'FECHAR', {
                        duration: 2000
                    });
                }, err => {
                    if (err.status === 404) {
                        this.snackBar.open('Email não encontrado.', 'FECHAR', {
                            duration: 2000
                        });
                    } else {
                        this.snackBar.open('Por favor, tente novamente mais tarde.', 'FECHAR', {
                            duration: 2000
                        });
                    }
                })
            }
        });
    }
}
