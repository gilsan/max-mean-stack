import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

   private authListenerSubs: Subscription;
   isAuthentication = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
  this.isAuthentication = this.authService.isUserAuthenticated();
   this.authListenerSubs = this.authService.getAuthStatusListener()
                     .subscribe( (isAuthenticated) => {
                       this.isAuthentication = isAuthenticated;
                     });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

 logout() {
    this.authService.logout();
 }

}
