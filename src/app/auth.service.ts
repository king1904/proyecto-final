import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { UserI } from './models/user';
import { Router, ActivatedRoute } from '@angular/router';

import { CompraService } from './compra.service';

@Injectable()
export class AuthService {
  userData = new BehaviorSubject<UserI>(null);

  // private navStateSource = new Subject<boolean>();

  loggedIn$ = new BehaviorSubject<boolean>(false);
  isAdmin$ = new BehaviorSubject<boolean>(false);

  returnUrl: string;

  AUTH_SERVER: string = 'http://localhost:8080';

  public currentUser: Observable<UserI>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private compraService:CompraService
  ) {
    if (this.loggedIn()) {
      this.userData.next(JSON.parse(localStorage.getItem('user_data')));
     }

    this.loggedIn$.next(this.loggedIn());
    this.isAdmin$.next(this.isAdmin());

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  loggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  isAdmin() {
    if (localStorage.getItem('user_data'))
      return JSON.parse(localStorage.getItem('user_data')).roles == 'ROLE_ADMIN'
        ? true
        : false;
  }

  register(user: UserI) {
    return this.http.post(this.AUTH_SERVER + '/register', user);
  }

  updateProfile(user) {
    return this.http.patch(this.AUTH_SERVER + '/update', user);
  }

  login1(email: string, password: string) {
    return this.http
      .post<any>(this.AUTH_SERVER + '/login', { email, password })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          localStorage.setItem('token', user.jwt);
          localStorage.setItem('user_data', JSON.stringify(user.usuario));

          return user;
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(this.AUTH_SERVER + '/login', { email, password })
      .subscribe(
        (res) => {
          localStorage.setItem('token', res.jwt);
          localStorage.setItem('user_data', JSON.stringify(res.usuario));

          this.loggedIn$.next(true);
          this.userData.next(JSON.parse(localStorage.getItem('user_data')));

          this.router.navigateByUrl(this.returnUrl);
        },
        (error) => {
          console.log(error);

          return false;
        }
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    this.router.navigateByUrl('/home');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getUserById(id:number):Observable<UserI>{
    return this.http.get<UserI>(this.AUTH_SERVER+"/user/"+ id )

  }

  getAllUsers(): Observable<UserI[]> {
    return this.http.get<UserI[]>(this.AUTH_SERVER + '/user');
  }
}
