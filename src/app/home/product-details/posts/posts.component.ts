import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
 import { BehaviorSubject, Observable } from 'rxjs';
 import { tdBounceAnimation } from '@covalent/core/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/shared/backendModels/interfaces';

@Component({
  animations: [tdBounceAnimation],
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit  {
  bounceState: boolean[] = [];
  isLoading = true;
  live=true;

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
    date:new FormControl('')
  });

  replyForm = new FormGroup({
    user_id: JSON.parse(localStorage.getItem('user_data'))
      ? new FormControl(+JSON.parse(localStorage.getItem('user_data')).id)
      : new FormControl(''),
    replay_id: new FormControl(''),

    product_id: new FormControl(+this.route.snapshot.paramMap.get('id')),
    text: new FormControl(''),
    likes: new FormControl(0),
    date:new FormControl('')

  });

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {}


  ngOnInit() {

    this.getPosts().subscribe(data=>{
      this.posts=this.orderPosts( data);
      this.isLoading=false;

      this.posts.forEach((post) => {
        this.bounceState.push(false);
      });

      console.log(data)
    });






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
    let time= new Date().getTime();
    let fecha  = new Date(time);

    this.postForm.value.date=fecha;

    if (this.postForm.value.text.trim() != '') {

      this.postsService.addPostToProduct(this.postForm.value).subscribe(
        (res) => {

          this.snackBar.open('Has comentado con éxito!!!', 'OK', {
            duration: 2000,
          });

          this.postForm.controls['text'].reset();

          this.getPosts().subscribe(data=>{
            this.posts=this.orderPosts( data);
          });

          console.log(res);
        },
        (error) => {

          this.snackBar.open('Ha ocurrido un error!!!', 'OK', {
            duration: 2000,
          });
          console.log(error);
        }
      );
    }
  }

  onReplyPost(index: number) {

    let time= new Date().getTime();
    let fecha  = new Date(time);


    if (this.replyForm.value.text.trim() != '') {
      let post = this.replyForm.value;
      //let user_id = JSON.parse(localStorage.getItem('user_data')).id;
      //post['user_id'] = user_id;
      post['replay_id'] = this.posts[index].id;
      post["date"]=fecha;
      this.postsService.addPostToProduct(post).subscribe(
        (res) => {
          this.snackBar.open('Has comentado con éxito!!!', 'OK', {
            duration: 2000,
          });

          this.postForm.controls['text'].reset();

          this.getPosts().subscribe(data=>{
            this.posts=this.orderPosts( data);
          });

          console.log(res);
        },
        (error) => {
          this.snackBar.open('Ha ocurrido un error!!!', 'OK', {
            duration: 2000,
          });

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
        this.snackBar.open('Te ha gustado un comentario!!!', 'OK', {
          duration: 2000,
        });

        if (pos2 == null) this.posts[pos].likes = res.likes;
        else this.posts[pos]['replays'][pos2] = res;

        console.log(res);
      },
      (error) => {
        this.snackBar.open('Ha ocurrido un error!!!', 'OK', {
          duration: 2000,
        });
        console.log(error);
      }
    );
  }

  onBounce(pos: number) {
    //this.bounceState=!this.bounceState;
    return this.bounceState[pos];
  }

  keyDownFunctionPost(event,message) {
    if (event.keyCode === 13 && message!=null) {

      this.onPost();
    }
  }

  keyDownFunctionReply(event,id,message) {
    if (event.keyCode === 13 && message!=null) {

      this.onReplyPost(id);
    }
  }

}
