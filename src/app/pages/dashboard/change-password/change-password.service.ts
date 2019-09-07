import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ChangePasswordService {
    constructor(private http: HttpClient) { }

    changePassword(nick: string, password: string) {
        return this.http.put<any>(`${environment.api.url}/${environment.api.version}/users/${nick}/password`, { password });
    }
}
