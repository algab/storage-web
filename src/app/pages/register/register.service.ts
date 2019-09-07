import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../models/user';
import { Bucket } from '../../models/bucket';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RegisterService {
    constructor(private http: HttpClient) { };

    async saveUser(user: User) {
        const result = await this.http.post(`${environment.api.url}/${environment.api.version}/users`, user).toPromise();
        return result;
    }

    async saveBucket(bucket: Bucket) {
        const result = this.http.post(`${environment.api.url}/${environment.api.version}/buckets`, bucket).toPromise();
        return result;
    }

    async login(email, password) {
        const result = this.http.post(`${environment.api.url}/${environment.api.version}/login`, { email, password }).toPromise();
        return result;
    }
}
