import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../shared/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  user: User;
  private authStatusSub: Subscription;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
   this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
      //  console.log(authStatus);
        this.isLoading = false;
      }
    );
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading =  true;
   this.authService.createUser(form.value.email, form.value.password);
   form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
