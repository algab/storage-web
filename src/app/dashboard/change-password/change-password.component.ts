import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";

import { UserService } from '../user.service';

@Component({
    selector: 'app-dashboard-change-password',
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
    formPassword: FormGroup
    buttonPassword: boolean = true

    constructor(private service: UserService, private form: FormBuilder, private snack: MatSnackBar) { }

    ngOnInit(): void {
        this.formPassword = this.form.group({
            password: ['', [Validators.required, Validators.minLength(8)]],
            passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]
        })
    }

    validatePassword() {
        let formPassword = this.formPassword.value
        if (formPassword.password != '' && formPassword.passwordConfirm != '') {
            if (formPassword.password != formPassword.passwordConfirm) {
                this.formPassword.controls['password'].setErrors({'incorrect': false});
                this.formPassword.controls['passwordConfirm'].setErrors({'incorrect': false});
                this.snack.open('Senhas não são iguais.', 'FECHAR', {
                    duration: 1000
                })
            }
            else {
                this.buttonPassword = false
            }
        }
    }

    updatePassword() {
        let nick = JSON.parse(localStorage.getItem('user')).nick;
        this.service.changePassword(nick, this.formPassword.get('password').value).subscribe(data => {
            this.snack.open('Senha atualizada com sucesso.', 'FECHAR', {
                duration: 1000
            })
        }, err => {
            this.snack.open('Por favor, tente novamente mais tarde.', 'FECHAR', {
                duration: 1000
            })
        })
    }
}