import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { extname } from 'path';

import { FileViewComponent } from '../../../components/file-view/file-view.component';
import { FileDeleteComponent } from '../../../components/file-delete/file-delete.component';
import { FileProgressComponent } from '../../../components/file-progress/file-progress.component';

import { FilesService } from './files.service';

import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-dashboard-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
    public url: string;
    public token: string;
    public folders: any[];
    public files: any[];

    private photo: any[] = ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.svg'];
    private video: any[] = ['.mp4', '.mkv', '.avi'];
    private music: any[] = ['.mp3', '.wma', '.ogg', '.acc', '.wav'];
    private zip: any[] = ['.zip', '.rar', '.exe'];

    constructor(
        private service: FilesService,
        private dialog: MatDialog,
        private snack: MatSnackBar,
    ) { }

    ngOnInit(): void {
        this.token = JSON.parse(localStorage.getItem('user')).token;
        this.getFiles();
    }

    getFiles() {
        this.files = [];
        this.folders = [];
        const bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
        this.url = `${environment.api.url}/${bucket}`;
        this.service.getBucket(bucket).subscribe(data => {
            this.folders = data.filter(object => object.type === 'folder');
            data.forEach(element => {
                if (element.type === 'object') {
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
                }
            });
        });
    }

    view(url: string, preview: string, name: string) {
        this.dialog.open(FileViewComponent, {
            data: { url, preview, name, type: 'bucket' }
        });
    }

    deleteFile(name: string) {
        const dialogRef = this.dialog.open(FileDeleteComponent, {
            width: '800px',
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                const bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
                this.service.deleteFileBucket(name, bucket).subscribe(() => {
                    this.snack.open('Arquivo excluido com sucesso.', 'Fechar', {
                        duration: 1500
                    });
                    this.getFiles();
                }, () => {
                    this.snack.open('Por favor, tente novamente mais tarde.', 'Fechar', {
                        duration: 1500
                    });
                });
            }
        });
    }

    uploadFile(event) {
        if (event.target.files[0]) {
            const bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
            const formData = new FormData();
            formData.append('file', event.target.files[0]);
            const dialogRef = this.dialog.open(FileProgressComponent, {
                width: '500px',
                data: { bucket, formData, type: 'bucket' }
            });
            dialogRef.afterClosed().subscribe(() => {
                this.getFiles();
                dialogRef.close();
            });
        }
    }
}
