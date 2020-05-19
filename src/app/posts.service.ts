import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './models/post';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsSubject$ = new BehaviorSubject<any[]>([]);

  constructor(private http:HttpClient,private route: ActivatedRoute) {


   }

  getPostsByProductId(id:number):Observable<Post[]>{

    return this.http.get<Post[]>("http://localhost:8080/posts/"+id);
  }

  addPostToProduct(post){

    return this.http.post<any>("http://localhost:8080/posts",post);
  }

  addLikeToPost(post){

    return this.http.patch<any>("http://localhost:8080/posts",post);
  }




  getMessages(){
    return this.http.get("http://localhost:8080/message/");
  }

  postMessage(message){
    return this.http.post("http://localhost:8080/message/",message);
  }


}
