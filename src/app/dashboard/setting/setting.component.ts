import { Component, OnInit } from "@angular/core";
import { MatDialog, MatSnackBar, MatDialogRef } from "@angular/material";

import { BucketService } from "../bucket.service";
import { UserService } from '../user.service';

@Component({
    selector: 'app-dashboard-setting',
    templateUrl: './setting.component.html'
})
export class SettingComponent implements OnInit {
    name: string
    size: string
    token: string
    stateBucket: string
    private: Boolean
    created: any
    modified: any

    constructor(private service: BucketService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.name = JSON.parse(localStorage.getItem('user')).bucket.name;
        this.private = JSON.parse(localStorage.getItem('user')).bucket.private;
        if (this.private) {
            this.stateBucket = "Privado"
        }
        else {
            this.stateBucket = "Público"
        }
        this.service.getBucketStats(this.name).subscribe(data => {
            this.size = data.size;
            this.created = data.created;
            this.modified = data.modified;
        });
    }

    privateBucket(): void {
        let nick = JSON.parse(localStorage.getItem('user')).nick;
        this.service.updateBucket(this.name, { nick, name: this.name, private: !this.private }).subscribe(data => {
            this.private = !this.private;
            if (this.private) {
                this.stateBucket = "Privado"
            }
            else {
                this.stateBucket = "Público"
            }
            let user = JSON.parse(localStorage.getItem('user'));
            user.bucket.private = this.private;
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(user));
            this.snackBar.open('Configurações alterada com sucesso.', 'FECHAR', {
                duration: 1000
            });
        });
    }

    generateToken() {
        this.dialog.open(DialogSettingToken,{
            width: '950px'
        });
    }
}

@Component({
    selector: 'dialog-setting-token',
    template: `
    <h1 mat-dialog-title>Token</h1>
    <div mat-dialog-content>
        <p style="font-size:12px">{{ token }}</p>
    </div>
    <div mat-dialog-actions align="end">        
        <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Fechar</button>
    </div>
    `
})
export class DialogSettingToken implements OnInit {
    token: string = ''

    constructor(private service: UserService, public dialogRef: MatDialogRef<SettingComponent>) { }

    ngOnInit(): void {
        let nick = JSON.parse(localStorage.getItem('user')).nick;
        this.service.tokenUser(nick).subscribe(data => {          
            this.token = data.token;
        });
    }
}