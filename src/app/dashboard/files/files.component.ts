import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from "@angular/material";

import { ObjectService } from "../object.service";
import { BucketService } from "../bucket.service";

import { environment } from "environments/environment";

import { extname } from "path";

@Component({
    selector: 'app-dashboard-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
    url: string = ''
    token: string = ''
    folders: any[] = []
    files: any[] = []
    photo: any[] = ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.svg']
    video: any[] = ['.mp4', '.mkv', '.avi']
    music: any[] = ['.mp3', '.wma', '.ogg', '.acc', '.wav']
    zip: any[] = ['.zip', '.rar', '.exe']

    constructor(private bucket: BucketService, private object: ObjectService, private dialog: MatDialog, private snack: MatSnackBar) { }

    ngOnInit(): void {
        this.token = JSON.parse(localStorage.getItem('user')).token.split(" ")[1];
        this.getFiles();
    }

    getFiles() {
        this.files = [];
        this.folders = [];
        let bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
        this.url = `${environment.api.url}/${bucket}`;
        this.bucket.getBucket(bucket).subscribe(data => {
            this.folders = data.filter(data => data.type === "folder");
            data.forEach(element => {
                if (element.type === "object") {
                    if (this.photo.includes(extname(element.name))) {
                        this.files.push({ ...element, url: `${this.url}/${element.name}?token=${this.token}`, preview: `${this.url}/${element.name}?token=${this.token}` })
                    }
                    else if (this.video.includes(extname(element.name))) {
                        this.files.push({ ...element, url: `${this.url}/${element.name}?token=${this.token}`, preview: '/assets/img/video.png' })
                    }
                    else if (this.music.includes(extname(element.name))) {
                        this.files.push({ ...element, url: `${this.url}/${element.name}?token=${this.token}`, preview: '/assets/img/music.png' })
                    }
                    else if (this.zip.includes(extname(element.name))) {
                        this.files.push({ ...element, url: `${this.url}/${element.name}?token=${this.token}`, preview: '/assets/img/zip.png' })
                    }
                    else if (extname(element.name) === ".pdf") {
                        this.files.push({ ...element, url: `${this.url}/${element.name}?token=${this.token}`, preview: '/assets/img/pdf.png' })
                    }
                    else {
                        this.files.push({ ...element, url: `${this.url}/${element.name}?token=${this.token}`, preview: '/assets/img/file.png' })
                    }
                }
            })
        })
    }

    view(url: string, preview: string, name: string) {
        this.dialog.open(DialogFilesView, {
            data: { url, preview, name }
        })
    }

    deleteFile(name: string) {
        const dialogRef = this.dialog.open(DialogFilesDelete, {
            width: '800px'
        })

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                let bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
                this.object.deleteFileBucket(name, bucket).subscribe(data => {
                    this.snack.open('Arquivo excluido com sucesso.', 'Fechar', {
                        duration: 1500
                    })
                    this.getFiles()
                }, err => {
                    this.snack.open('Por favor, tente novamente mais tarde.', 'Fechar', {
                        duration: 1500
                    })
                })
            }
        })
    }

    uploadFile(event) {
        if (event.target.files[0]) {
            let bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
            let formData = new FormData();
            formData.append('file', event.target.files[0]);

            const dialogRef = this.dialog.open(DialogFilesProgress, {
                width: '500px',
                data: { bucket, formData }
            })

            dialogRef.afterClosed().subscribe(result => {
                this.getFiles()
            })
        }
    }
}

@Component({
    selector: 'dialog-files-view',
    template: `
    <h1 mat-dialog-title>Visualizar Arquivo</h1>
    <div mat-dialog-content>
        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12" *ngIf="typeFile === 'photo'">
                <img [src]="data.preview" style="width: 100%" />                              
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12" *ngIf="typeFile === 'video'">
                <video width="100%" controls>
                    <source [src]="data.url" />
                </video>                             
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12" *ngIf="typeFile === 'music'">
                <audio width="100%" controls>
                    <source [src]="data.url" />
                </audio>                              
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="card">
                    <div class="card-header card-header-info card-header-icon">
                        <div class="card-icon"><i class="material-icons">info</i></div>
                        <h4 class="card-title">Detalhes</h4>                                                 
                    </div>
                    <div class="card-body table-responsive">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td class="text-info"><b>Nome do Arquivo</b></td>
                                    <td>{{ data.name }}</td>
                                </tr>
                                <tr>
                                    <td class="text-info"><b>Data de Upload</b></td>
                                    <td>{{ dateUpload }}</td>
                                </tr>
                                <tr>
                                    <td class="text-info"><b>Tamanho</b></td>
                                    <td>{{ size }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>            
        </div>                            
    </div>
    <div mat-dialog-actions align="end">        
        <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Fechar</button>
    </div>
    `
})
export class DialogFilesView implements OnInit {
    dateUpload: string = ''
    size: string = ''
    typeFile: string = ''
    photo: any[] = ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.svg']
    video: any[] = ['.mp4', '.mkv', '.avi']
    music: any[] = ['.mp3', '.wma', '.ogg', '.acc', '.wav']
    zip: any[] = ['.zip', '.rar', '.exe']

    constructor(private service: ObjectService, @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        if (this.video.includes(extname(this.data.name))) {
            this.typeFile = 'video'
        }
        else if (this.music.includes(extname(this.data.name))) {
            this.typeFile = 'music'
        }
        else {
            this.typeFile = 'photo'
        }
        let bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
        this.service.getObjectBucket(this.data.name, bucket).subscribe(data => {
            this.dateUpload = data.created.date;
            this.size = data.size;
        })
    }
}

@Component({
    selector: 'dialog-files-delete',
    template: `
    <h1 mat-dialog-title>Excluir</h1>
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
    constructor(public dialogRef: MatDialogRef<FilesComponent>) { }

    close() {
        this.dialogRef.close()
    }
}

@Component({
    selector: 'dialog-files-progress',
    template: `
    <h1 mat-dialog-title>Enviando arquivo ...</h1>
    <div mat-dialog-content>
        <mat-progress-bar [value]="progress"></mat-progress-bar>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Fechar</button>
    </div>
    `
})
export class DialogFilesProgress implements OnInit {
    progress: number = 0

    constructor(private service: ObjectService, private snack: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        this.service.uploadFileBucket(this.data.bucket, this.data.formData).subscribe(data => {
            this.snack.open('Upload realizado com sucesso.', 'FECHAR', {
                duration: 2000
            })
        }, err => {
            if (err.status == 409) {
                this.snack.open('Esse arquivo está corrompido.', 'FECHAR', {
                    duration: 2000
                })
            }
            else {
                this.snack.open('Por favor, tente novamente mais tarde.', 'FECHAR', {
                    duration: 2000
                })
            }
        })

        this.service.uploadProgress().subscribe(data => {
            this.progress = data.percent
        })
    }
}