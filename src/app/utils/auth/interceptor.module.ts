import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { BearerInterceptor } from "./bearer-interceptor.service";

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BearerInterceptor,
            multi: true
        }
    ]
})
export class Interceptor {}