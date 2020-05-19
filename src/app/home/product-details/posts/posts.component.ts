import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/posts.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/auth.service';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[];
  p: number = 1;
  replay$ = new BehaviorSubject<boolean>(false);

  postForm = new FormGroup({
    user_id: new FormControl(''),
    replay_id: new FormControl(''),

    product_id: new FormControl(+this.route.snapshot.paramMap.get('id')),
    text: new FormControl(''),
    likes: new FormControl(0),
  });

  replyForm = new FormGroup({
    user_id: new FormControl(''),
    replay_id: new FormControl(''),

    product_id: new FormControl(+this.route.snapshot.paramMap.get('id')),
    text: new FormControl(''),
    likes: new FormControl(0),
  });

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  async ngOnInit() {
   await this.getPosts();
  }

  async getPosts() {
    this.postsService
      .getPostsByProductId(+this.route.snapshot.paramMap.get('id'))
      .subscribe((data: any[]) => {
        this.postsService.postsSubject$.next(data);
        console.log(data);
      });
    this.postsService.postsSubject$.subscribe((data) => {

      this.posts = data.sort((a, b) => b.id - a.id);
      data.forEach((post) => {
        if (post.replays.length != 0) post.replays.sort((a, b) => b.id - a.id);
      });

    });
  }

  onPost() {
    if (this.postForm.value.text.trim() != '') {
      let post = this.postForm.value;
      let user_id = JSON.parse(localStorage.getItem('user_data')).id;
      post['user_id'] = user_id;

      this.postsService.addPostToProduct(post).subscribe(
        (res) => {
          this.postForm.controls['text'].reset();

          this.getPosts();

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
      let user_id = JSON.parse(localStorage.getItem('user_data')).id;
      post['user_id'] = user_id;
      post['replay_id'] = this.posts[index].id;

      this.postsService.addPostToProduct(post).subscribe(
        (res) => {
          this.postForm.controls['text'].reset();
          this.posts[index]['replays'].push(res);
          this.posts[index]['replays'] = this.posts[index]['replays'].sort(
            (a, b) => b.id - a.id
          );

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
}
