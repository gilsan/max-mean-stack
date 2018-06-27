import { Post } from './../shared/post.model';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
   private postsUpdated = new Subject<Post[]>();

  public postsUpdate$: Observable<Post[]> = this.postsUpdated.asObservable();

   constructor(private http: HttpClient) {}

  getPosts() {
     this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
       .subscribe( (postData) => {
              this.posts =  postData.posts;
              this.postsUpdated.next([...this.posts]);
       });
   // return [...this.posts];
  }

  getPostUpdateListener() {
   // return this.postsUpdated.asObservable();
    return this.postsUpdate$;

  }

  addPost(title: string, content: string) {
    const post: Post = { id: 'id', title: title, content: content};
   // this.posts.push(post);
    this.http.post<{message: string}> ('http://localhost:3000/api/posts', post)
     .subscribe( (responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
     });

  }



}
