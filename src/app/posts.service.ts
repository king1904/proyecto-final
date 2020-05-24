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
  //url:string="http://localhost:8080/backend/service";
 url:string="https://tienda-pc.herokuapp.com/backend/service";

  constructor(private http:HttpClient,private route: ActivatedRoute) {


   }

  getPostsByProductId(id:number):Observable<Post[]>{

    return this.http.get<Post[]>(this.url+"/posts/"+id);
  }

  addPostToProduct(post){

    return this.http.post<any>(this.url+"/posts",post);
  }

  addLikeToPost(post){

    return this.http.patch<any>(this.url+"/posts",post);
  }




  getMessages(){
    return this.http.get(this.url+"/message/");
  }

  postMessage(message){
    return this.http.post(this.url+"/message/",message);
  }


}
