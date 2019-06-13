import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { LoginService } from "./login.service";
import { MatSnackBar } from '@angular/material';
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private formLogin: FormGroup

    constructor(private form: FormBuilder, private service: LoginService, private snackBar: MatSnackBar, private router: Router) {}

    ngOnInit(): void {
        this.formLogin = this.form.group({
            email: ['', [Validators.required,Validators.email]],
            password: ['', [Validators.required,Validators.minLength(8)]],
        })
    }

    login() {
        this.service.login(this.formLogin.get('email').value,this.formLogin.get('password').value).subscribe(data => {
            localStorage.setItem('user',JSON.stringify(data))
            this.router.navigateByUrl("/user/dashboard/home")
        }, err => {
            if (err.status == 404) {
                this.formLogin.controls['email'].setErrors({'incorrect': true});
                this.formLogin.controls['password'].setErrors({'incorrect': true});
                this.snackBar.open('Verifique o email e a senha novamente.', 'FECHAR', {
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
}