import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { RegisterService } from './register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    public formRegister: FormGroup;
    public buttonRegister: Boolean = true;

    constructor(
        private form: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar,
        private service: RegisterService,
    ) { }

    ngOnInit(): void {
        this.formRegister = this.form.group({
            name: ['', Validators.required],
            nick: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            bucket: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            passwordConfirm: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    validate() {
        const user = this.formRegister.value;
        if (this.formRegister.valid) {
            if (user.password !== '' && user.passwordConfirm !== '') {
                if (this.formRegister.get('passwordConfirm').errors == null) {
                    if (user.password !== user.passwordConfirm) {
                        this.formRegister.controls['password'].setErrors({ 'incorrect': true });
                        this.formRegister.controls['passwordConfirm'].setErrors({ 'incorrect': true });
                        this.snackBar.open('As senhas não são iguais.', 'FECHAR', {
                            duration: 2000
                        });
                    } else if (user.name !== '' && user.bucket !== '' && user.email !== '' && user.nick !== '') {
                        this.buttonRegister = false;
                    } else {
                        this.formRegister.controls['password'].setErrors({ 'incorrect': false });
                        this.formRegister.controls['passwordConfirm'].setErrors({ 'incorrect': false });
                        this.buttonRegister = true;
                        this.snackBar.open('Preencha todos os campos.', 'FECHAR', {
                            duration: 2000
                        });
                    }
                }
            }
        }
    }

    async save() {
        try {
            const user = this.formRegister.value;
            const nameBucket = user.bucket;
            delete user.bucket;
            delete user.passwordConfirm;
            await this.service.saveUser(user);
            await this.service.saveBucket({ name: nameBucket, user_nick: user.nick, private: true });
            const data = await this.service.login(user.email, user.password);
            localStorage.setItem('user', JSON.stringify(data));
            this.router.navigateByUrl('/dashboard/home');
        } catch (error) {
            if (error.status === 409) {
                this.snackBar.open(this.messageError(error.error.Message), 'FECHAR', {
                    duration: 2000
                });
            } else if (error.status === 400) {
                this.snackBar.open('O nick deve conter apenas letras minúsculas e números.', 'FECHAR', {
                    duration: 2000
                });
            } else {
                this.snackBar.open('Por favor, tente novamente mais tarde.', 'FECHAR', {
                    duration: 2000
                });
            }
        }
    }

    messageError(message: string) {
        if (message === 'Email conflict') {
            this.formRegister.controls['email'].setErrors({ 'incorrect': true });
            return 'Insira outro email, pois esse já está cadastrado.';
        } else if (message === 'Nick already exists') {
            this.formRegister.controls['nick'].setErrors({ 'incorrect': true });
            return 'Insira outro nick, pois esse já está cadastrado.';
        } else {
            return 'Por favor, tente novamente mais tarde.';
        }
    }
}
