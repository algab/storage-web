import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { UserService } from '../user.service';

import { User } from 'app/user';

@Component({
    selector: 'app-dashboard-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    user: User
    state: any[]
    formProfile: FormGroup

    constructor(private service: UserService, private form: FormBuilder, private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.formProfile = this.form.group({
            name: ['', Validators.required],
            nick: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', [Validators.required, Validators.maxLength(2)]],
            city: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });
        this.formProfile.setValue({ name: this.user.name, nick: this.user.nick, country: this.user.country, state: this.user.state, city: this.user.city, email: this.user.email });
    }

    update() {
        let user = this.formProfile.value;
        this.service.updateUser(JSON.parse(localStorage.getItem('user')).nick, user).subscribe(data => {
            let profile = this.profileUser(user);
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(profile));
            this.snackBar.open('Perfil atualizado com sucesso.', 'FECHAR', {
                duration: 1000
            });
        }, err => {
            if (err.status == 409) {
                this.snackBar.open(this.error(err.error.Message), 'FECHAR', {
                    duration: 2000
                });
            }
        })
    }

    profileUser(user: any) {
        user.bucket = JSON.parse(localStorage.getItem('user')).bucket;
        user.token = JSON.parse(localStorage.getItem('user')).token;
        user.date = JSON.parse(localStorage.getItem('user')).date;
        return user;
    }

    error(message: string) {
        if (message == "Email already exists") {
            return "Insira outro email, pois esse já está cadastrado.";
        }
        else {
            return "Por favor, tente novamente mais tarde.";
        }
    }
}