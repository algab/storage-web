import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { extname } from 'path';

import { FilesService } from '../../pages/dashboard/files/files.service';

@Component({
    selector: 'app-file-view',
    templateUrl: './file-view.component.html'
})
export class FileViewComponent implements OnInit {
    public dateUpload: string;
    public size: string;
    public typeFile: string;

    private photo: any[] = ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.svg']
    private video: any[] = ['.mp4', '.mkv', '.avi']
    private music: any[] = ['.mp3', '.wma', '.ogg', '.acc', '.wav']
    private zip: any[] = ['.zip', '.rar', '.exe', '.xls']

    constructor(private service: FilesService, @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        if (this.video.includes(extname(this.data.name))) {
            this.typeFile = 'video';
        } else if (this.music.includes(extname(this.data.name))) {
            this.typeFile = 'music';
        } else if (this.photo.includes(extname(this.data.name))) {
            this.typeFile = 'photo';
        } else if (this.zip.includes(extname(this.data.name))) {
            this.typeFile = 'zip';
        } else if (extname(this.data.name) === '.pdf') {
            this.typeFile = 'pdf';
        }
        const bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
        if (this.data.type === 'bucket') {
            this.service.getObjectBucket(this.data.name, bucket).subscribe(data => {
                this.dateUpload = data.created;
                this.size = data.size;
            });
        } else {
            this.service.getObjectFolder(this.data.name, bucket, this.data.nameSubFolder).subscribe(data => {
                this.dateUpload = data.created;
                this.size = data.size;
            });
        }
    }
}
