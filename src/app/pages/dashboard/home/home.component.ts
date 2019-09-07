import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { extname } from 'path';

import { HomeService } from './home.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-dashboard-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public nameBucket: string;
    public size: string;
    public storage: string;
    public modified: string;
    public folders: any[] = [];
    public files: any[] = [];

    private photo: any[] = ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.svg'];
    private video: any[] = ['.mp4', '.mkv', '.avi'];
    private music: any[] = ['.mp3', '.wma', '.ogg', '.acc', '.wav'];
    private zip: any[] = ['.zip', '.rar', '.exe'];

    constructor(private service: HomeService, private router: Router) { }

    ngOnInit() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user.bucket.name !== undefined) {
            this.nameBucket = user.bucket.name;
            this.service.getBucketStats(user.bucket.name).subscribe(data => {
                this.size = data.size.split(' ')[0];
                this.storage = data.size.split(' ')[1];
                this.modified = data.modified;
            });
            this.service.getBucket(user.bucket.name).subscribe(data => {
                this.folders = data.filter(object => object.type === 'folder')
                data.forEach(element => {
                    const url = `${environment.api.url}/${user.bucket.name}`
                    if (element.type === 'object') {
                        if (this.photo.includes(extname(element.name))) {
                            this.files.push({ ...element, preview: `${url}/${element.name}?token=${user.token}` })
                        } else if (this.video.includes(extname(element.name))) {
                            this.files.push({ ...element, preview: '/assets/img/video.png' })
                        } else if (this.music.includes(extname(element.name))) {
                            this.files.push({ ...element, preview: '/assets/img/music.png' })
                        } else if (this.zip.includes(extname(element.name))) {
                            this.files.push({ ...element, preview: '/assets/img/zip.png' })
                        } else if (extname(element.name) === '.pdf') {
                            this.files.push({ ...element, preview: '/assets/img/pdf.png' })
                        } else {
                            this.files.push({ ...element, preview: '/assets/img/file.png' })
                        }
                    }
                });
            });
        } else {
            this.router.navigateByUrl('/register/bucket');
        }
    }
}
