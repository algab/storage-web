import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';

import { ProfileTokenComponent } from '../../../components/profile-token/profile-token.component';

import { User } from '../../../models/user';
import { ProfileService } from './profile.service';

@Component({
    selector: 'app-dashboard-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    public formProfile: FormGroup;
    public user: User;
    public state: any[];
    public name: string;
    public private: Boolean;
    public stateBucket: string;
    public size: string;
    public created: string;
    public modified: string;

    constructor(
        private form: FormBuilder,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private service: ProfileService,
    ) { }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.name = JSON.parse(localStorage.getItem('user')).bucket.name;
        this.private = JSON.parse(localStorage.getItem('user')).bucket.private;
        this.formProfile = this.form.group({
            name: [this.user.name, Validators.required],
            nick: [this.user.nick, Validators.required],
            email: [this.user.email, [Validators.required, Validators.email]]
        });
        if (this.private) {
            this.stateBucket = 'Privado';
        } else {
            this.stateBucket = 'Público';
        }
        this.service.getBucketStats(this.name).subscribe(data => {
            this.size = data.size;
            this.created = data.created;
            this.modified = data.modified;
        });
    }

    update() {
        const user = this.formProfile.value;
        this.service.updateUser(JSON.parse(localStorage.getItem('user')).nick, user).subscribe(data => {
            const profile = this.profileUser(user);
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(profile));
            this.snackBar.open('Perfil atualizado com sucesso.', 'FECHAR', {
                duration: 1000
            });
        }, err => {
            if (err.status === 409) {
                this.snackBar.open(this.error(err.error.Message), 'FECHAR', {
                    duration: 2000
                });
            }
        })
    }

    privateBucket(): void {
        const user_nick = JSON.parse(localStorage.getItem('user')).nick;
        this.service.updateBucket(this.name, { user_nick, name: this.name, private: !this.private }).subscribe(data => {
            this.private = !this.private;
            if (this.private) {
                this.stateBucket = 'Privado';
            } else {
                this.stateBucket = 'Público';
            }
            const user = JSON.parse(localStorage.getItem('user'));
            user.bucket.private = this.private;
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(user));
            this.snackBar.open('Configurações alterada com sucesso.', 'FECHAR', {
                duration: 1000
            });
        });
    }

    generateToken() {
        this.dialog.open(ProfileTokenComponent, {
            width: '950px',
        });
    }

    profileUser(user: any) {
        user.bucket = JSON.parse(localStorage.getItem('user')).bucket;
        user.token = JSON.parse(localStorage.getItem('user')).token;
        user.date = JSON.parse(localStorage.getItem('user')).date;
        return user;
    }

    error(message: string) {
        if (message === 'Email already exists') {
            return 'Insira outro email, pois esse já está cadastrado.';
        } else {
            return 'Por favor, tente novamente mais tarde.';
        }
    }
}
