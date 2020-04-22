import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { tap, map } from 'rxjs/operators';
import{ Observable, BehaviorSubject, Subject } from "rxjs";
import { UserI } from './models/user';
import { JwtResponseI } from './models/jwt-response';
import { Router, ActivatedRoute } from '@angular/router';
import jwtDecode  from 'jwt-decode';
import { UserResponse } from './models/user-response';


@Injectable()
export class AuthService {

  userData=new  BehaviorSubject<UserI>(null);

 // private navStateSource = new Subject<boolean>();

  loggedIn$ =new BehaviorSubject<boolean>(false);
  returnUrl:string;


  AUTH_SERVER:string="http://localhost:8080";
  //authSubject= new BehaviorSubject(false);
  private token:string;


  private currentUserSubject=new  BehaviorSubject<UserI>(null);
  public currentUser: Observable<UserI>;

  constructor(private http: HttpClient,private router :Router,
    private route: ActivatedRoute) {
    this.currentUserSubject = new BehaviorSubject<UserI>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    if(this.loggedIn()){

      this.userData.next(JSON.parse(localStorage.getItem("user_data")))
    }

    this.loggedIn$.next(this.loggedIn());


   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';



  }


  loggedIn(){
   //  let exp=jwtDecode(localStorage.getItem("token")).exp;
    //let now=  Date.now();

     return ( localStorage.getItem("token")) ?  true:  false;



  }

  register(user:UserI){

    return this.http.post(this.AUTH_SERVER+"/register",user);
  }

  updateProfile(user:UserI){

    return this.http.put(this.AUTH_SERVER+"/update",user);
  }


  login1(email: string, password: string) {

    return this.http.post<any>(this.AUTH_SERVER+"/login", { email, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes

            localStorage.setItem('token', user.jwt);
            this.currentUserSubject.next(user);
            return user;
        }))

      }





  login(email: string, password: string) {

    return this.http.post<any>(this.AUTH_SERVER+"/login", { email, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes

            localStorage.setItem('token', user.jwt);
           // this.currentUserSubject.next(user);
            return user;
        })).subscribe(
          res=>{
           console.log(res);
           this.loggedIn$.next(true);

           this.router.navigateByUrl(this.returnUrl);
           this.getUserData(email).subscribe(data=>   {
            localStorage.setItem("user_data",  JSON.stringify(data));

            this.userData.next(JSON.parse(localStorage.getItem("user_data")));
            return true;

        });
          },error=>{
            console.log(error);

            return false;
          }
        );
}




    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('user_data');
        this.router.navigateByUrl("/home");
    }


   getToken():string{
    return localStorage.getItem("token");
  }



  getUserData(email:string):Observable<UserResponse>{
    return this.http.get<UserResponse>(this.AUTH_SERVER+"/user/"+ email )
    .pipe(map(user => {

        return user;
    }));
  }
}
