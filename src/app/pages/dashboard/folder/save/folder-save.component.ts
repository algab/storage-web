import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { FolderService } from '../folder.service';

@Component({
    selector: 'app-dashboard-folder-save',
    templateUrl: './folder-save.component.html'
})
export class FolderSaveComponent implements OnInit {
    public formFolder: FormGroup;

    constructor(private service: FolderService, private form: FormBuilder, private snackBar: MatSnackBar, private router: Router) { }

    ngOnInit(): void {
        this.formFolder = this.form.group({
            name: ['', Validators.required]
        })
    }

    save() {
        const bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
        this.service.saveFolder({ bucket, folder: this.formFolder.get('name').value }).subscribe(data => {
            this.router.navigateByUrl('/dashboard/home')
        }, err => {
            if (err.status === 400) {
                this.snackBar.open('A pasta deve ter apenas letras minúsculas e números.', 'FECHAR', {
                    duration: 1500
                });
            } else if (err.status === 409) {
                this.snackBar.open('Pasta com o mesmo nome já existe', 'FECHAR', {
                    duration: 1500
                });
            } else {
                this.snackBar.open('Por favor, tente novamente mais tarde', 'FECHAR', {
                    duration: 1000
                });
            }
        })
    }
}
