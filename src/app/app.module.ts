import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './shared/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent} from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostsService } from './services/posts.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostListComponent,
    PostCreateComponent
  ],
  imports: [

  BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
