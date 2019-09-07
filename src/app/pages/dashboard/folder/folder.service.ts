import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FolderService {
    constructor(private http: HttpClient) { }

    saveFolder(data: any): Observable<any> {
        return this.http.post<any>(`${environment.api.url}/${environment.api.version}/folders`, data);
    }

    getBucket(name: string): Observable<any> {
        return this.http.get(`${environment.api.url}/${name}`);
    }

    getFolder(bucket: string, folder: string): Observable<any> {
        return this.http.get(`${environment.api.url}/${bucket}/${folder}`);
    }

    getFolderStats(name: string): Observable<any> {
        return this.http.get<any>(`${environment.api.url}/${environment.api.version}/folders/${name}`);
    }

    getFolderInfo(folder: string, bucket: string): Observable<any> {
        return this.http.get<any>(`${environment.api.url}/${environment.api.version}/folders/${folder}?bucket=${bucket}`);
    }

    editFolder(nameFolder: string, data: any): Observable<any> {
        return this.http.put<any>(`${environment.api.url}/${environment.api.version}/folders/${nameFolder}`, data);
    }

    deleteFolder(bucket: string, folder: string): Observable<any> {
        return this.http.delete<any>(`${environment.api.url}/${environment.api.version}/folders/${folder}?bucket=${bucket}`);
    }
}
