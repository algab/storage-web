import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class BucketService {
    constructor(private http: HttpClient) { }

    getBucket(name: string): Observable<any> {
        return this.http.get(`${environment.api.url}/${name}`);
    }

    getBucketStats(name: string): Observable<any> {
        return this.http.get<any>(`${environment.api.url}/${environment.api.version}/buckets/${name}`);
    }

    updateBucket(name:string, data: any): Observable<any> {
        return this.http.put<any>(`${environment.api.url}/${environment.api.version}/buckets/${name}`,data);
    } 
}