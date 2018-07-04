/*
   Outgoing Http 헤더에 JWT 토큰을 삽입하는 서비스
   예: Authorization 토큰.....
   module 에  provider:[{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorSevice}]
   필요
*/

import { Injectable } from '@angular/core';

import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error/error/error.component';



@Injectable()
export class ErrorInterceptorSevice implements HttpInterceptor {
   constructor(private dialog: MatDialog) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req).pipe(
      catchError( (error: HttpErrorResponse) => {
          console.log(error);
          let errorMessage = '에러 발생!!!';
          if (error.error.message) {
             errorMessage = error.error.message;
          }
          this.dialog.open(ErrorComponent, {
            data: { message: errorMessage },
            height: '200px',
            width: '200px',

          });
         return  throwError(error);

      })
    );
  }
}
