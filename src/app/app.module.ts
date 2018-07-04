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
import { AuthService } from './auth/auth.service';
import { AuthInterceptorSevice } from './auth/auth-interceptor';
import { ErrorInterceptorSevice } from './error-interceptor';
import { ErrorComponent } from './error/error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostListComponent,
    PostCreateComponent,
    ErrorComponent
  ],
  imports: [

  BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,

  ],
  providers: [PostsService, AuthService,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorSevice, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorSevice, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
