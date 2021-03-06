import { Post } from './../shared/post.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
   private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  public postsUpdate$: Observable<{posts: Post[], postCount: number}> = this.postsUpdated.asObservable();

   constructor(private http: HttpClient, private router: Router) {}


    /*  데이타 가져오기     */
  getPosts(postsPerPage: number, currentPage: number) {
     const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
     this.http.get<{message: string, posts: any, maxPosts: number}>('http://localhost:3000/api/posts' + queryParams)
       .pipe( map( (postData) => {
          return {
               posts: postData.posts.map( post => {
                return {
                  title: post.title,
                  content: post.content,
                  id: post._id,
                  imagePath: post.imagePath,
                  creator: post.creator
                };
              }),
              maxPosts: postData.maxPosts
          };
       }) )
       .subscribe( (transformedPostsData) => {
              this.posts =  transformedPostsData.posts;
              this.postsUpdated.next(
                {posts: [...this.posts], postCount: transformedPostsData.maxPosts} );
       });
   // return [...this.posts];
  }

  getPostUpdateListener() {
   // return this.postsUpdated.asObservable();
    return this.postsUpdate$;
  }


getPost(id: string) {
  return this.http.get<{
    _id: string,
    title: string,
    content: string,
    imagePath: string
    creator: string}>('http://localhost:3000/api/posts/' + id);
}


    /*  데이타 저장하기     */
  addPost(title: string, content: string, image: File) {
   // const post: Post = { id: 'id', title: title, content: content};
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http.post<{message: string, post: Post}> ('http://localhost:3000/api/posts', postData)
     .subscribe( (responseData) => {
       /*
       // console.log('addPost:  ', responseData);
       const post: Post = { id: responseData.post.id, title: title, content: content, imagePath: responseData.post.imagePath};
       // const id = responseData.postId;
       // post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        */
        this.router.navigate(['/']);
     });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
   // const post: Post = { id: id, title: title, content: content, imagePath: null};
    let postData: Post | FormData;
    if ( typeof image === 'object') {
      // 그림인 경우
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
    // url인 경우
        postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null
     };
    }

    this.http.put('http://localhost:3000/api/posts/' + id, postData)
    .subscribe((response) => {
      /*
         const updatedPosts = [...this.posts];
         const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
         const post: Post = {
           id: id,
           title: title,
           content: content,
           imagePath: ''
         };
         updatedPosts[oldPostIndex] = post;
         this.posts = updatedPosts;
         this.postsUpdated.next([...this.posts]);
         */
         this.router.navigate(['/']);
    });
  }

     /* 데이타 삭제 하기  */
     deletePost(postId: string) {
      // console.log('posts service: ', postId);
      return  this.http.delete('http://localhost:3000/api/posts/' + postId);
       /*
         .subscribe( () => {
           const updatedPosts = this.posts.filter( post => post.id !== postId);
           this.posts = updatedPosts;
           this.postsUpdated.next([...this.posts]);

         });
         */
    }



}
