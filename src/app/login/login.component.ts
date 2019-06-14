import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog, MatSnackBar, MatDialogRef } from "@angular/material";

import { LoginService } from "./login.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private formLogin: FormGroup

    constructor(private form: FormBuilder, private service: LoginService, private snackBar: MatSnackBar, private router: Router, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.formLogin = this.form.group({
            email: ['', [Validators.required,Validators.email]],
            password: ['', [Validators.required,Validators.minLength(8)]],
        })
    }

    login() {
        this.service.login(this.formLogin.get('email').value,this.formLogin.get('password').value).subscribe(data => {
            localStorage.setItem('user',JSON.stringify(data));
            this.router.navigateByUrl("/user/dashboard/home");
        }, err => {
            if (err.status == 404) {
                this.formLogin.controls['email'].setErrors({'incorrect': true});
                this.formLogin.controls['password'].setErrors({'incorrect': true});
                this.snackBar.open('Verifique se o email e a senha estão corretos, e tente novamente.', 'FECHAR', {
                    duration: 2000
                })  
            }
            else {
                this.snackBar.open('Por favor, tente novamente mais tarde.', 'FECHAR', {
                    duration: 2000
                })  
            }
        })
    }

    password() {
        const dialogRef = this.dialog.open(DialogLoginPassword, {
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
                    }
                    else {
                        this.snackBar.open('Verifique se o email está correto.', 'FECHAR', {
                            duration: 2000
                        });
                    }
                })
            }
        });
    }
}

@Component({
    selector: 'dialog-login-password',
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
export class DialogLoginPassword {
    name: string

    constructor(public dialogRef: MatDialogRef<LoginComponent>) { }

    close() {
        this.dialogRef.close()
    }
}