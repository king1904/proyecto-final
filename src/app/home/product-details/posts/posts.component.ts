import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PostsService } from 'src/app/posts.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { tdBounceAnimation } from '@covalent/core/common';

@Component({
  animations: [tdBounceAnimation],
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit  {
  bounceState: boolean[] = [];

  posts: Post[];
  posts$: Observable<Post[]>;
  p: number = 1;
  replay$ = new BehaviorSubject<boolean>(false);

  postForm = new FormGroup({
    user_id: JSON.parse(localStorage.getItem('user_data'))
      ? new FormControl(+JSON.parse(localStorage.getItem('user_data')).id)
      : new FormControl(''),
    replay_id: new FormControl(''),

    product_id: new FormControl(+this.route.snapshot.paramMap.get('id')),
    text: new FormControl(''),
    likes: new FormControl(0),
  });

  replyForm = new FormGroup({
    user_id: JSON.parse(localStorage.getItem('user_data'))
      ? new FormControl(+JSON.parse(localStorage.getItem('user_data')).id)
      : new FormControl(''),
    replay_id: new FormControl(''),

    product_id: new FormControl(+this.route.snapshot.paramMap.get('id')),
    text: new FormControl(''),
    likes: new FormControl(0),
  });

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService
  ) {}


  ngOnInit() {

    this.getPosts().subscribe(data=>{
      this.posts=this.orderPosts( data);
      console.log(data)
    });


    if (this.posts)
      this.posts.forEach((post) => {
        this.bounceState.push(false);
      });

    /*   this.getPosts().subscribe((data: any[]) => {
    this.posts=data;
    console.log(data);
  }); */

  }

  getPosts() {
    return this.postsService.getPostsByProductId(
      +this.route.snapshot.paramMap.get('id')
    );
  }
  orderPosts(posts) {

      posts.sort((a, b) => b.id - a.id);
      posts.forEach((post) => {
        if (post.replays.length != 0) post.replays.sort((a, b) => b.id - a.id);
      });
   return posts;
  }

  onPost() {
    console.log(this.postForm.value);
    if (this.postForm.value.text.trim() != '') {
      let post = this.postForm.value;

      this.postsService.addPostToProduct(this.postForm.value).subscribe(
        (res) => {
          this.postForm.controls['text'].reset();

          this.getPosts().subscribe(data=>{
            this.posts=this.orderPosts( data);
          });

          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onReplyPost(index: number) {
    if (this.replyForm.value.text.trim() != '') {
      let post = this.replyForm.value;
      //let user_id = JSON.parse(localStorage.getItem('user_data')).id;
      //post['user_id'] = user_id;
      post['replay_id'] = this.posts[index].id;

      this.postsService.addPostToProduct(post).subscribe(
        (res) => {
          this.postForm.controls['text'].reset();

          this.getPosts().subscribe(data=>{
            this.posts=this.orderPosts( data);
          });

          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onLike(postId: number, likesPost: number, pos: number, pos2?: number) {
    let post = {
      id: postId,
      likes: likesPost + 1,
    };

    console.log(post);

    this.postsService.addLikeToPost(post).subscribe(
      (res) => {
        if (pos2 == null) this.posts[pos].likes = res.likes;
        else this.posts[pos]['replays'][pos2] = res;

        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBounce(pos: number) {
    //this.bounceState=!this.bounceState;
    return this.bounceState[pos];
  }
}
