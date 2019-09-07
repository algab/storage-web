import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('user') != null) {
            const token = JSON.parse(localStorage.getItem('user')).token
            req = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            })
        }
        return next.handle(req);
    }
}
