import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

import { RegisterService } from "../register.service";

@Component({
    selector: 'app-register-bucket',
    templateUrl: './register-bucket.component.html'
})
export class RegisterBucketComponent implements OnInit {
    private formBucket: FormGroup

    constructor(private form: FormBuilder, private router: Router, private service: RegisterService, private snack: MatSnackBar) { }

    ngOnInit(): void {
        this.formBucket = this.form.group({
            name: ['', Validators.required]
        })
    }

    save() {
        let user = JSON.parse(localStorage.getItem('user'));
        let bucket = this.formBucket.get('name').value;
        this.service.saveBucket({ name: bucket, nick: user.nick }).subscribe(data => {
            localStorage.removeItem('user');
            user.bucket = {
                name: bucket,
                date: data.date,
                private: true,
                owner: user.nick
            }
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigateByUrl("/user/dashboard/home");
        }, err => {           
            this.snack.open(this.messageError(err.error.Message), 'FECHAR', {
                duration: 2000
            })
        })
    }

    messageError(message: string) {
        if (message === "User not found") {
            return "Usuário não encontrado.";
        }
        else if (message === "User already has a bucket") {
            return "Usuário já possui uma conta.";
        }
        else if (message === "Bucket already exists") {
            return "Esse nome está indisponível, tente outro.";
        }
        else {
            return "Por favor, tente novamente mais tarde.";
        }
    }
}