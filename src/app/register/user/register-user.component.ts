import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

import { RegisterService } from "../register.service";

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html'
})
export class RegisterUserComponent implements OnInit {
    private formRegister: FormGroup;

    buttonRegister: boolean = true;

    constructor(private form: FormBuilder, private router: Router, private service: RegisterService, private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.formRegister = this.form.group({
            name: ['', Validators.required],
            nick: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', [Validators.required, Validators.maxLength(2)]],
            city: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    validate() {
        let user = this.formRegister.value
        if (user.password != '' && user.passwordConfirm != '') {
            if (this.formRegister.get('passwordConfirm').errors == null) {
                if (user.password !== user.passwordConfirm) {
                    this.formRegister.controls['password'].setErrors({'incorrect': true});
                    this.formRegister.controls['passwordConfirm'].setErrors({'incorrect': true});
                    this.snackBar.open('As senhas não são iguais.', 'FECHAR', {
                        duration: 2000
                    });
                }
                else if (user.name != '' && user.state != '' && user.city != '' && user.email != '' && user.nick != '') {
                    this.buttonRegister = false;
                }
                else {
                    this.formRegister.controls['password'].setErrors({'incorrect': false});
                    this.formRegister.controls['passwordConfirm'].setErrors({'incorrect': false});
                    this.buttonRegister = true;
                    this.snackBar.open('Preencha todos os campos.', 'FECHAR', {
                        duration: 2000
                    });
                }
            }
        }
    }

    save() {
        let user = this.formRegister.value;
        delete user.passwordConfirm;
        this.service.saveUser(user).subscribe(data => {
            this.service.login(user.email,user.password).subscribe(data => {
                localStorage.setItem('user', JSON.stringify(data));
                this.router.navigateByUrl("/register/bucket");
            }, err => {
                this.snackBar.open('Por favor, tente novamente mais tarde.', 'FECHAR', {
                    duration: 2000
                });
            });
        }, err => {            
            if (err.status == 409) {
                this.snackBar.open(this.messageError(err.error.Message), 'FECHAR', {
                    duration: 2000
                });
            }     
            else {
                this.snackBar.open('O nick deve conter apenas letras minúsculas e números.', 'FECHAR', {
                    duration: 2000
                });
            }                  
        })
    }

    messageError(message:string) {
        if (message === "Email conflict") {
            this.formRegister.controls['email'].setErrors({'incorrect': true});
            return "Insira outro email, pois esse já está cadastrado.";            
        }
        else if (message === "Nick already exists") {
            this.formRegister.controls['nick'].setErrors({'incorrect': true});
            return "Insira outro nick, pois esse já está cadastrado.";
        }
        else {
            return "Por favor, tente novamente mais tarde.";
        }
    }
}