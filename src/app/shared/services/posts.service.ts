import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Post } from '../backendModels/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsSubject$ = new BehaviorSubject<any[]>([]);

  private baseUrl = environment.baseUrlRestServices;


  constructor(private http:HttpClient,private route: ActivatedRoute ) {


   }

  getPostsByProductId(id:number):Observable<Post[]>{

    return this.http.get<Post[]>(this.baseUrl+"/posts/"+id);
  }

  addPostToProduct(post){

    return this.http.post<any>(this.baseUrl+"/posts",post);
  }

  addLikeToPost(post){

    return this.http.patch<any>(this.baseUrl+"/posts",post);
  }




  getMessages(){
    return this.http.get(this.baseUrl+"/message/");
  }

  postMessage(message){
    return this.http.post(this.baseUrl+"/message/",message);
  }

  deleteMessage(id:number){
    return this.http.delete(this.baseUrl+"/message/"+id);

}
}
