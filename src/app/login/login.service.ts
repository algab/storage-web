import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";

@Injectable({providedIn:'root'})
export class LoginService {
    constructor(private http: HttpClient) {}

    login(email,password): Observable<any> {
        return this.http.post<any>(`${environment.api.url}/${environment.api.version}/login`,{email,password})
    }
}