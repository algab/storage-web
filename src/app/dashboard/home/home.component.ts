import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from "@angular/material";
import { extname } from "path";

import { BucketService } from '../bucket.service';
import { environment } from "environments/environment";

@Component({
    selector: 'app-dashboard-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    nameBucket: string
    size: string
    storage: string
    modified: string
    folders: any[] = []
    files: any[] = []
    photo: any[] = ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.svg']
    video: any[] = ['.mp4', '.mkv', '.avi']
    music: any[] = ['.mp3', '.wma', '.ogg', '.acc', '.wav']
    zip: any[] = ['.zip', '.rar', '.exe']

    constructor(private service: BucketService, private router: Router, private dialog: MatDialog) { }

    ngOnInit() {
        let user = JSON.parse(localStorage.getItem('user'));               
        if (user.bucket.name !== undefined) {
            this.nameBucket = user.bucket.name;
            
            this.service.getBucketStats(user.bucket.name).subscribe(data => {               
                this.size = data.size.split(" ")[0]
                this.storage = data.size.split(" ")[1]
                this.modified = data.modified.date
            });

            this.service.getBucket(user.bucket.name).subscribe(data => {
                this.folders = data.filter(data => data.type === "folder")
                data.forEach(element => {
                    let url = `${environment.api.url}/${user.bucket.name}`
                    if (element.type === "object") {
                        if (this.photo.includes(extname(element.name))) {
                            this.files.push({ ...element, preview: `${url}/${element.name}` })
                        }
                        else if (this.video.includes(extname(element.name))) {
                            this.files.push({ ...element, preview: '/assets/img/video.png' })
                        }
                        else if (this.music.includes(extname(element.name))) {
                            this.files.push({ ...element, preview: '/assets/img/music.png' })
                        }
                        else if (this.zip.includes(extname(element.name))) {
                            this.files.push({ ...element, preview: '/assets/img/zip.png' })
                        }
                        else if (extname(element.name) === ".pdf") {
                            this.files.push({ ...element, preview: '/assets/img/pdf.png' })
                        }
                        else {
                            this.files.push({ ...element, preview: '/assets/img/file.png' })
                        }
                    }
                });
            });            
        }
        else {          
            this.router.navigateByUrl("/register/bucket");           
        }
    }

    createBucket() {
        const dialogRef = this.dialog.open(DialogFilesDelete, {
            width: '800px'
        })

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                console.log(result);                
            }
        })
    }
}

@Component({
    selector: 'dialog-files-delete',
    template: `
    <h1 mat-dialog-title>Excluir Arquivo</h1>
    <div mat-dialog-content>
        <p>Você tem certeza que deseja excluir ?</p>
    </div>
    <div mat-dialog-actions>        
        <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Sim</button>
        <button mat-button (click)="close()">Não</button>
    </div>
    `
})
export class DialogFilesDelete {
    constructor(public dialogRef: MatDialogRef<HomeComponent>) { }

    close() {
        this.dialogRef.close()
    }
}