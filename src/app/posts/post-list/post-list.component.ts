import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Post } from '../../shared/post.model';
import { PostsService } from '../../services/posts.service';
import {PageEvent} from '@angular/material';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

   posts: Post[] = [];
   private postsSub: Subscription;
  posts$: Observable<Post[]>;
  isLoading = false;
   totalPosts = 0;
   postsPerPage =  2;
   currentPage = 1;
   pageSize = [1, 2, 5, 10];
   isUserAuthenticated = false;
   userId: string;

   private authStatusSub: Subscription;
  constructor(
    private postsService: PostsService,
    private authService: AuthService ) {}

  ngOnInit() {
   // this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub =  this.postsService.postsUpdate$
    // this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe( (postsData: { posts: Post[], postCount: number} ) => {
        this.isLoading = false;
        this.posts = postsData.posts;
        this.totalPosts = postsData.postCount;
      }  );

      this.isUserAuthenticated = this.authService.isUserAuthenticated();
     this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe( (isAuthenticated) => {
         this.isUserAuthenticated = isAuthenticated;
         this.userId = this.authService.getUserId();
      });
  }

  onDelete(postId: string) {
  // console.log('post-list: ', postId);
    this.isLoading = true;
    this.postsService.deletePost(postId)
     .subscribe( () => {
         this.postsService.getPosts(this.postsPerPage, this.currentPage);
     }, () => {
       this.isLoading = false;
     });
  }

  onPageEvent(pageData: PageEvent) {
      this.isLoading = true;
      this.currentPage = pageData.pageIndex + 1;
      this.postsPerPage = pageData.pageSize;
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy() {
   this.postsSub.unsubscribe();
   this.authStatusSub.unsubscribe();
  }
}
