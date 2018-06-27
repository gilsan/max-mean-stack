import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Post } from '../../shared/post.model';
import { PostsService } from '../../services/posts.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
   posts: Post[] = [];
   private postsSub: Subscription;
  posts$: Observable<Post[]>;
  constructor( private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub =  this.postsService.postsUpdate$
      .subscribe( (posts: Post[]) => {
        this.posts = posts;
      }  );
  }

  ngOnDestroy() {
   this.postsSub.unsubscribe();
  }
}
