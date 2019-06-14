import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${environment.api.url}/${environment.api.version}/login`, { email, password })
    }

    resetPassword(email: string): Observable<any> {
        return this.http.put<any>(`${environment.api.url}/${environment.api.version}/login/password`, { email });
    }
}