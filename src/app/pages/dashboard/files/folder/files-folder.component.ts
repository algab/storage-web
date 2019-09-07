import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { extname } from 'path';

import { FileProgressComponent } from '../../../../components/file-progress/file-progress.component';
import { FileViewComponent } from '../../../../components/file-view/file-view.component';
import { FileDeleteComponent } from '../../../../components/file-delete/file-delete.component';

import { FilesService } from '../files.service';

import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-dashboard-files-folder',
    templateUrl: './files-folder.component.html',
    styleUrls: ['./files-folder.component.css']
})
export class FilesFolderComponent implements OnInit {
    public url: string;
    public token: string;
    public nameFolder: string;
    public files: any[] = [];

    private photo = ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.svg'];
    private video = ['.mp4', '.mkv', '.avi'];
    private music = ['.mp3', '.wma', '.ogg', '.acc', '.wav'];
    private zip = ['.zip', '.rar', '.exe'];

    constructor(
        private service: FilesService,
        private router: ActivatedRoute,
        private dialog: MatDialog,
        private snack: MatSnackBar,
    ) { }

    ngOnInit(): void {
        this.token = JSON.parse(localStorage.getItem('user')).token;
        this.nameFolder = this.router.snapshot.paramMap.get('name');
        this.getFiles();
    }

    getFiles() {
        this.files = [];
        const bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
        this.url = `${environment.api.url}/${bucket}/${this.nameFolder}`;
        this.service.getFolder(bucket, this.nameFolder).subscribe(data => {
            data.forEach(element => {
                if (this.photo.includes(extname(element.name))) {
                    this.files.push({
                        ...element,
                        url: `${this.url}/${element.name}?token=${this.token}`,
                        preview: `${this.url}/${element.name}?token=${this.token}`,
                    });
                } else if (this.video.includes(extname(element.name))) {
                    this.files.push({
                        ...element,
                        url: `${this.url}/${element.name}?token=${this.token}`,
                        preview: '/assets/img/video.png',
                    });
                } else if (this.music.includes(extname(element.name))) {
                    this.files.push({
                        ...element,
                        url: `${this.url}/${element.name}?token=${this.token}`,
                        preview: '/assets/img/music.png',
                    });
                } else if (this.zip.includes(extname(element.name))) {
                    this.files.push({
                        ...element,
                        url: `${this.url}/${element.name}?token=${this.token}`,
                        preview: '/assets/img/zip.png',
                    });
                } else if (extname(element.name) === '.pdf') {
                    this.files.push({
                        ...element,
                        url: `${this.url}/${element.name}?token=${this.token}`,
                        preview: '/assets/img/pdf.png',
                    });
                } else {
                    this.files.push({
                        ...element,
                        url: `${this.url}/${element.name}?token=${this.token}`,
                        preview: '/assets/img/file.png',
                    });
                }
            })
        })
    }

    view(url: string, preview: string, name: string) {
        this.dialog.open(FileViewComponent, {
            data: { url, preview, name, nameSubFolder: this.nameFolder, type: 'folder' }
        });
    }

    deleteFile(name: string) {
        const dialogRef = this.dialog.open(FileDeleteComponent, {
            width: '800px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                const bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
                this.service.deleteFileFolder(name, bucket, this.nameFolder).subscribe(data => {
                    this.snack.open('Arquivo excluido com sucesso.', 'Fechar', {
                        duration: 1000
                    });
                    this.getFiles();
                }, () => {
                    this.snack.open('Por favor, tente novamente mais tarde.', 'Fechar', {
                        duration: 1000
                    });
                });
            }
        });
    }

    uploadFile(event) {
        if (event.target.files[0]) {
            const formData = new FormData();
            const bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
            formData.append('file', event.target.files[0]);
            const dialogRef = this.dialog.open(FileProgressComponent, {
                width: '500px',
                data: { bucket, folder: this.nameFolder, formData, type: 'folder' }
            });
            dialogRef.afterClosed().subscribe(() => {
                this.getFiles();
                dialogRef.close();
            });
        }
    }
}
