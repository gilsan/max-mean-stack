import { Post } from './../shared/post.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
   private postsUpdated = new Subject<Post[]>();

  public postsUpdate$: Observable<Post[]> = this.postsUpdated.asObservable();

   constructor(private http: HttpClient, private router: Router) {}


    /*  데이타 가져오기     */
  getPosts() {
     this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
       .pipe( map( (postData) => {
          return postData.posts.map( post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          });
       }) )
       .subscribe( (transformedPosts) => {
              this.posts =  transformedPosts;
              this.postsUpdated.next([...this.posts]);
       });
   // return [...this.posts];
  }

  getPostUpdateListener() {
   // return this.postsUpdated.asObservable();
    return this.postsUpdate$;
  }
 

getPost(id: string) {
  return this.http.get<{_id:string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
}


    /*  데이타 저장하기     */
  addPost(title: string, content: string) {
    const post: Post = { id: 'id', title: title, content: content};

    this.http.post<{message: string, postId: string}> ('http://localhost:3000/api/posts', post)
     .subscribe( (responseData) => {
       // console.log('addPost:  ', responseData);
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
     });
  }

  updatePost(id: string, title: string, content: string) {    
    const post: Post = { id: id, title: title, content: content};
    this.http.put('http://localhost:3000/api/posts/' + id, post)
    .subscribe((response) => {     
         const updatedPosts = [...this.posts];
         const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
         updatedPosts[oldPostIndex] = post;
         this.posts = updatedPosts;
         this.postsUpdated.next([...this.posts]);     
         this.router.navigate(['/']);   
    });    
  }

     /* 데이타 삭제 하기  */
     deletePost(postId: string) {
      // console.log('posts service: ', postId);
       this.http.delete('http://localhost:3000/api/posts/' + postId)
         .subscribe( () => {
           const updatedPosts = this.posts.filter( post => post.id !== postId);
           this.posts = updatedPosts;
           this.postsUpdated.next([...this.posts]);

         });
    }



}
