import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from "app/user";

import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    updateUser(nick: string, user: User): Observable<any> {
        return this.http.put<any>(`${environment.api.url}/${environment.api.version}/users/${nick}`, user);
    }

    tokenUser(nick: string):  Observable<any> {
        return this.http.put<any>(`${environment.api.url}/${environment.api.version}/users/${nick}/token`,{});
    }    

    changePassword(nick: string, password: string) {
        return this.http.put<any>(`${environment.api.url}/${environment.api.version}/users/${nick}/password`, { password });
    }
}