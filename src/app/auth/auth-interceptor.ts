/*
   Outgoing Http 헤더에 JWT 토큰을 삽입하는 서비스
   예: Authorization 토큰.....
   module 에  provider:[{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorSevice}]
   필요
*/

import { Injectable } from '@angular/core';

import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable()
export class AuthInterceptorSevice implements HttpInterceptor {

   constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
       headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authRequest);
  }
}
