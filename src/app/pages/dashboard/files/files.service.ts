import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as socketIO from 'socket.io-client';

import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FilesService {
    private socket: any;

    constructor(private http: HttpClient) {
        this.socket = socketIO(environment.api.url);
    }

    getBucket(name: string): Observable<any> {
        return this.http.get(`${environment.api.url}/${name}`);
    }

    getFolder(bucket: string, folder: string): Observable<any> {
        return this.http.get(`${environment.api.url}/${bucket}/${folder}`);
    }

    getObjectBucket(name: string, bucket: string): Observable<any> {
        return this.http.get<any[]>(`${environment.api.url}/${environment.api.version}/objects/${name}?bucket=${bucket}`);
    }

    getObjectFolder(name: string, bucket: string, folder: string): Observable<any> {
        return this.http.get<any[]>(`${environment.api.url}/${environment.api.version}/objects/${name}?bucket=${bucket}&folder=${folder}`);
    }

    uploadFileBucket(bucket: string, data: any): Observable<any> {
        return this.http.post<any>(`${environment.api.url}/${environment.api.version}/objects/upload?bucket=${bucket}`, data);
    }

    uploadFileFolder(bucket: string, folder: string, data: any): Observable<any> {
        return this.http.post<any>(`${environment.api.url}/${environment.api.version}/objects/upload?bucket=${bucket}&folder=${folder}`, data);
    }

    deleteFileBucket(name: string, bucket: string): Observable<any> {
        return this.http.delete<any>(`${environment.api.url}/${environment.api.version}/objects/${name}?bucket=${bucket}`);
    }

    deleteFileFolder(name: string, bucket: string, folder: string): Observable<any> {
        return this.http.delete<any>(`${environment.api.url}/${environment.api.version}/objects/${name}?bucket=${bucket}&folder=${folder}`);
    }

    uploadProgress(): Observable<any> {
        const nick = JSON.parse(localStorage.getItem('user')).nick;
        return new Observable(observer => {
            this.socket.on(nick, (data: any) => observer.next(data));
        });
    }
}
