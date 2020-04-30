import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/posts.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

posts:any[];

postForm = new FormGroup({
  userId: new FormControl(JSON.parse( localStorage.getItem("user_data")).id),
  productId: new FormControl(+this.route.snapshot.paramMap.get('id')),
text:new FormControl(''),
img:new FormControl("https://bootdey.com/img/Content/avatar/avatar1.png"),
likes:new FormControl(0),
});

likeForm = new FormGroup({
  userId: new FormControl(JSON.parse( localStorage.getItem("user_data")).id),
  productId: new FormControl(+this.route.snapshot.paramMap.get('id')),
text:new FormControl(''),
img:new FormControl("https://bootdey.com/img/Content/avatar/avatar1.png"),
likes:new FormControl(0),
});



  constructor(private postsService:PostsService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.getPosts().subscribe(
      ( data:any[])=> { this.postsService.postsSubject$.next(data);
     console.log(data)
     }
     )
         this.postsService.postsSubject$.subscribe(data=>{
          this.posts=data;
         })

  }

  getPosts(){

       return  this.postsService.getPostsByProductId(
      +this.route.snapshot.paramMap.get('id')) ;
  }

onPost(){

  if(this.postForm.value.text.trim()!=""){
let post:Post=this.postForm.value;
this.postsService.addPostToProduct(post).subscribe( res=>{
this.posts= [res,...this.posts]
  console.log(res);

 },error=>{
   console.log(error);
 });
}


}

onLike(pos:number){

  let postId=this.posts[pos].id;
  let post={
    id: postId,
userId: this.posts[pos].userId,
productId: this.posts[pos].productId,
text: this.posts[pos].text,
date: this.posts[pos].date,
img: this.posts[pos].img,
likes: this.posts[pos].likes+1
  }
  this.postsService.addLikeToPost(post).subscribe( res=>{
    this.posts[pos]= res
      console.log(res);

     },error=>{
       console.log(error);
     });


}

}
