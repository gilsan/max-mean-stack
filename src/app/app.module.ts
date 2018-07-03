import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from './shared/material.module';
import {   MatPaginatorIntl} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent} from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostsService } from './services/posts.service';
import { AppRoutingModule } from './app-routing.module';
import { MatPaginatorIntlCro } from './posts/post-list/matPaginatorIntlCro';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './auth/auth.service';
import { AuthInterceptorSevice } from './auth/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostListComponent,
    PostCreateComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [

  BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [PostsService, AuthService,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorSevice, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
