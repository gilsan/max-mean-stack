import { Component , OnInit } from '@angular/core';
import {   FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { Post } from '../../shared/post.model';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

   private mode = 'create';
   private postId: string;
    post: Post;
    form: FormGroup;
    imagePreview: string;

  constructor(
    private postsService:  PostsService,
    private router: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
    this.router.paramMap.subscribe( (paramMap: ParamMap) => {

      if (paramMap.has('postId')) {
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
          this.postsService.getPost(this.postId)
            .subscribe( postData => {

               this.post = {
                    id:        postData._id,
                    title:     postData.title,
                    content:   postData.content,
                    imagePath: postData.imagePath,
                    creator:   postData.creator };

               this.form.setValue({
                      title: this.post.title,
                      content: this.post.content,
                       image: this.post.imagePath});
            });

        } else {
         this.mode = 'create';
         this.postId = null;
      }
    });
  }

  buildForm() {

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.minLength(3)]],
      image: ['', [ Validators.required],  mimeType.bind(this) ]
    });

  }
  // 그림올리기와 보기
  onImagePicked(event: Event) {
    const file = ( event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
   reader.onload = () => {
     this.imagePreview = reader.result;

   };
   reader.readAsDataURL(file);

  }


  onSavePost() {
    if (this.form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.postsService.addPost(
        this.form.value.title,
         this.form.value.content,
         this.form.value.image);
    } else {
     this.postsService.updatePost(
       this.postId,
       this.form.value.title,
       this.form.value.content,
       this.form.value.image

     );
    }

    this.form.reset();
  }
}
