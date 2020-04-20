import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { tap, map } from 'rxjs/operators';
import{ Observable, BehaviorSubject, Subject } from "rxjs";
import { UserI } from './models/user';
import { JwtResponseI } from './models/jwt-response';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable()
export class AuthService {

  userData= new BehaviorSubject<any>(null);

  private navStateSource = new Subject<boolean>();

  loggedIn$ = new BehaviorSubject<boolean>(false);
  returnUrl:string;


  AUTH_SERVER:string="http://localhost:8080";
  //authSubject= new BehaviorSubject(false);
  private token:string;


  private currentUserSubject: BehaviorSubject<UserI>;
  public currentUser: Observable<UserI>;

  constructor(private http: HttpClient,private router :Router,
    private route: ActivatedRoute) {
    this.currentUserSubject = new BehaviorSubject<UserI>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    if(this.loggedIn()){
     // this.userName.next(JSON.parse(localStorage.getItem("user_data")).username);
     this.userData.next(JSON.parse(localStorage.getItem("user_data")))
    }

    this.loggedIn$.next(this.loggedIn());

   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }


  loggedIn(){
    return localStorage.getItem("token")? true:false;
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
            this.currentUserSubject.next(user);
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


   private saveToken(token : string ,expiresIn : string):void{
    localStorage.setItem("ACCESS_TOKEN",token);
    localStorage.setItem("EXPIRES_IN",expiresIn);

    this.token=token;

  }

   getToken():string{


    return localStorage.getItem("token");
  }


  getUserData(email:string){
    return this.http.get<UserI>(this.AUTH_SERVER+"/user/"+ email )
    .pipe(map(user => {

        return user;
    }));
  }
}
