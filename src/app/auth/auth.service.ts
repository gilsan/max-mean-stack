import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();
  isAuthenticated = false;
  private tokenTimer: any;
  private userId: string;

  constructor(private http: HttpClient, private router: Router) {}

   getToken() {
     return this.token;
   }

   getAuthStatusListener() {
     return this.authStatusListener.asObservable();
   }

   getUserId() {
     return this.userId;
   }

   isUserAuthenticated () {
     return this.isAuthenticated ;
   }

   logout() {
     this.isAuthenticated = null;
     this.token = null;
     this.authStatusListener.next(false);
     this.userId = null;
     clearTimeout(this.tokenTimer);
    this.clearAuthData();
     this.router.navigate(['/auth', 'login']);
   }

   userLogin(email: string, password: string) {
    const userData = { email: email, password: password};

    return this.http.post<{ token: string, expiresIn: number, userId: string}>
    ('http://localhost:3000/api/users/login', userData)
      .subscribe( response => {
         const token = response.token;
         const expiresIn = response.expiresIn;
         this.token = token;
         if (token) {
           this.isAuthenticated = true;
           this.userId = response.userId;
          this.authStatusListener.next(true);
          this.setAuthTimer(expiresIn);

         const now = new Date();
         const expirationDate = new Date(now.getTime() + (expiresIn * 1000));
         this.saveAuthData(token, expirationDate, this.userId);
        // console.log(expirationDate);
          this.router.navigate(['/']);
         }

      }, error => {
        this.authStatusListener.next(false);
      });
  }

  createUser(email: string, password: string) {
     const userData = { email: email, password: password};
     this.http.post('http://localhost:3000/api/users/signup', userData)
       .subscribe(( response) => {
          this.router.navigate(['/']);
       }, err => {
          this.authStatusListener.next(false);
       } );
  }
  /*  토큰 localStorage 저장   */
  private saveAuthData(token: string, expirationData: Date, userId: string) {
     localStorage.setItem('token', token);
     localStorage.setItem('expiration', expirationData.toISOString());
     localStorage.setItem('userId', userId);
  }

   /*  토큰 localStorage 삭제   */
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

   /*  사용자 로그인시 토큰 저장 및 확인 및 저장 토큰얻기    */
  autoAuthUser() {
    const authInformation =   this.getAuthDate();
    if (!authInformation) {
          return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log('남은 시간: ', expiresIn);
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }

  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
   }, duration * 1000 );
  }

  private getAuthDate() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    if ( !token || !expirationDate ) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
     };
  }

}
