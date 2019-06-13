import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from "app/user";
import { Bucket } from "app/bucket";

import { environment } from "../../environments/environment";

@Injectable({providedIn:'root'})
export class RegisterService {
    constructor(private http: HttpClient) {};

    saveUser(user:User): Observable<any> {
        return this.http.post<any>(`${environment.api.url}/${environment.api.version}/users`,user);
    }

    saveBucket(bucket:Bucket): Observable<any> {
        return this.http.post<any>(`${environment.api.url}/${environment.api.version}/buckets`,bucket);
    } 

    login(email,password): Observable<any> {
        return this.http.post<any>(`${environment.api.url}/${environment.api.version}/login`,{email,password})
    }
}