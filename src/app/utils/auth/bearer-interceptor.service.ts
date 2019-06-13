import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class BearerInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {     
        if (localStorage.getItem('user') != null) {
            let token = JSON.parse(localStorage.getItem('user')).token
            req = req.clone({
                headers: req.headers.set('Authorization',token)
            })                         
        }     
        return next.handle(req)
    }
}
