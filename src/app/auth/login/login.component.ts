import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../shared/user.model';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  user: User;
  result$: Subscription;
  private authStatusSub: Subscription;
  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
       authStatus => {
         // console.log('login ngOnInit: ', authStatus);
         this.isLoading = false;
       }
     );
   }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
      this.isLoading = true;
      this.authService.userLogin(form.value.email, form.value.password);
  }

  ngOnDestroy() {
   // this.result$.unsubscribe();
   this.authStatusSub.unsubscribe();
  }



}
