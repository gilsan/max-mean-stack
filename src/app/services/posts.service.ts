import { Post } from './../shared/post.model';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
   private postsUpdated = new Subject<Post[]>();

  public postsUpdate$: Observable<Post[]> = this.postsUpdated.asObservable();


  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
   // return this.postsUpdated.asObservable();
    return this.postsUpdate$;

  }

  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }



}
