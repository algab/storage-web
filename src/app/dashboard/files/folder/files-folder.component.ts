import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from "@angular/material";

import { FolderService } from "../../folder.service";
import { ObjectService } from "../../object.service";

import { environment } from "environments/environment";

import { extname } from "path";

@Component({
    selector: 'app-dashboard-files-folder',
    templateUrl: './files-folder.component.html',
    styleUrls: ['./files-folder.component.css']
})
export class FilesFolderComponent implements OnInit {
    url: string = ''
    token: string = ''
    nameFolder: string = ''
    files: any[] = []
    photo: any[] = ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.svg']
    video: any[] = ['.mp4', '.mkv', '.avi']
    music: any[] = ['.mp3', '.wma', '.ogg', '.acc', '.wav']
    zip: any[] = ['.zip', '.rar', '.exe']

    constructor(private folder: FolderService, private object: ObjectService, private router: ActivatedRoute, private dialog: MatDialog, private snack: MatSnackBar) { }

    ngOnInit(): void {
        this.token = JSON.parse(localStorage.getItem('user')).token.split(" ")[1];
        this.nameFolder = this.router.snapshot.paramMap.get('name');
        this.getFiles();
    }

    getFiles() {
        this.files = [];
        let bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
        this.url = `${environment.api.url}/${bucket}/${this.nameFolder}`;
        this.folder.getFolder(bucket, this.nameFolder).subscribe(data => {
            data.forEach(element => {
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
            })
        })
    }

    view(url: string, preview: string, name: string) {
        this.dialog.open(DialogFoldersListView, {
            data: { url, preview, name, nameSubFolder: this.nameFolder }
        })
    }

    deleteFile(name: string) {
        const dialogRef = this.dialog.open(DialogFoldersListDelete, {
            width: '800px'
        })

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                let bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
                this.object.deleteFileFolder(name, bucket, this.nameFolder).subscribe(data => {
                    this.snack.open('Arquivo excluido com sucesso.', 'Fechar', {
                        duration: 1000
                    })
                    this.getFiles()
                }, err => {
                    this.snack.open('Por favor, tente novamente mais tarde.', 'Fechar', {
                        duration: 1000
                    })
                })
            }
        })
    }

    uploadFile(event) {
        if (event.target.files[0]) {
            let formData = new FormData();
            let bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
            formData.append('file', event.target.files[0]);

            const dialogRef = this.dialog.open(DialogFoldersListProgress, {
                width: '500px',
                data: { bucket, folder: this.nameFolder, formData }
            })

            dialogRef.afterClosed().subscribe(result => {
                this.getFiles()
            })
        }
    }
}

@Component({
    selector: 'dialog-folders-list-view',
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
export class DialogFoldersListView implements OnInit {
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
        this.service.getObjectFolder(this.data.name, bucket, this.data.nameSubFolder).subscribe(data => {
            this.dateUpload = data.created.date;
            this.size = data.size;
        })
    }
}

@Component({
    selector: 'dialog-folders-list-delete',
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
export class DialogFoldersListDelete {
    constructor(public dialogRef: MatDialogRef<FilesFolderComponent>) { }

    close() {
        this.dialogRef.close()
    }
}

@Component({
    selector: 'dialog-folders-list-progress',
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
export class DialogFoldersListProgress implements OnInit {
    progress: number = 0

    constructor(private service: ObjectService, private snack: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        this.service.uploadFileFolder(this.data.bucket, this.data.folder, this.data.formData).subscribe(data => {
            this.snack.open('Upload realizado com sucesso.', 'FECHAR', {
                duration: 1000
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