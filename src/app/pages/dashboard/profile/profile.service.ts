import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from 'app/models/user';

import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    constructor(private http: HttpClient) { }

    updateUser(nick: string, user: User): Observable<any> {
        return this.http.put<any>(`${environment.api.url}/${environment.api.version}/users/${nick}`, user);
    }

    tokenUser(nick: string): Observable<any> {
        return this.http.put<any>(`${environment.api.url}/${environment.api.version}/users/${nick}/token`, {});
    }

    getBucketStats(name: string): Observable<any> {
        return this.http.get<any>(`${environment.api.url}/${environment.api.version}/buckets/${name}`);
    }

    updateBucket(name: string, data: any): Observable<any> {
        return this.http.put<any>(`${environment.api.url}/${environment.api.version}/buckets/${name}`, data);
    }
}
