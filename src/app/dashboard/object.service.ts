import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import * as socketIo from 'socket.io-client';

import { environment } from "environments/environment";

@Injectable({providedIn:'root'})
export class ObjectService {
    private socket;
     
    constructor(private http: HttpClient) {
        this.socket = socketIo(environment.api.url);
    }

    uploadFileBucket(bucket: string, data: any): Observable<any> {
        return this.http.post<any>(`${environment.api.url}/${environment.api.version}/objects/upload?bucket=${bucket}`, data);
    }

    uploadFileFolder(bucket: string, folder: string, data: any): Observable<any> {
        return this.http.post<any>(`${environment.api.url}/${environment.api.version}/objects/upload?bucket=${bucket}&folder=${folder}`, data);
    }

    getObjectBucket(name: string, bucket: string): Observable<any> {
        return this.http.get<any[]>(`${environment.api.url}/${environment.api.version}/objects/${name}?bucket=${bucket}`);
    }

    getObjectFolder(name: string, bucket: string, folder: string): Observable<any> {
        return this.http.get<any[]>(`${environment.api.url}/${environment.api.version}/objects/${name}?bucket=${bucket}&folder=${folder}`);
    }

    deleteFileBucket(name: string, bucket: string): Observable<any> {
        return this.http.delete<any>(`${environment.api.url}/${environment.api.version}/objects/${name}?bucket=${bucket}`);
    }

    deleteFileFolder(name: string, bucket: string, folder: string): Observable<any> {
        return this.http.delete<any>(`${environment.api.url}/${environment.api.version}/objects/${name}?bucket=${bucket}&folder=${folder}`);
    }

    uploadProgress(): Observable<any> {
        let token = JSON.parse(localStorage.getItem('user')).nick;
        return new Observable<any>(observer => {
            this.socket.on(token, (data: any) => observer.next(data));
        });
    }
}