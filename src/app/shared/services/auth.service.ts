import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { CompraService } from './compra.service';
import { environment } from 'src/environments/environment';
import { UserI } from '../backendModels/interfaces';

@Injectable()
export class AuthService {
  userData = new BehaviorSubject<UserI>(null);

  // private navStateSource = new Subject<boolean>();

  loggedIn$ = new BehaviorSubject<boolean>(false);
  isAdmin$ = new BehaviorSubject<boolean>(false);

  returnUrl: string;

  private baseUrl = environment.baseUrlRestServices;

  public currentUser: Observable<UserI>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
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
     if (this.userData.value)
      return this.userData.value.roles == 'ROLE_ADMIN'
        ? true
        : false;
  }

  register(user) {
    return this.http.post(this.baseUrl + '/usuario/register', user);
  }

  updateProfile(user) {
    return this.http.patch(this.baseUrl + '/usuario/update', user);
  }
  adminUpdateUser(id:number,user) {
    return this.http.patch(this.baseUrl + '/usuario/update/'+id, user);
  }


  login1(email: string, password: string) {
    return this.http
      .post<any>(this.baseUrl + '/usuario/login', { email, password })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          this.userData.next(user.usuario);
          localStorage.setItem('token', user.jwt);
          localStorage.setItem('user_data', JSON.stringify(user.usuario));

          return user;
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(this.baseUrl + '/usuario/login', { email, password })
      .subscribe(
        (res) => {
          this.userData.next(res.usuario);
          localStorage.setItem('token', res.jwt);
          localStorage.setItem('user_data', JSON.stringify(res.usuario));
          localStorage.setItem('cart', JSON.stringify(res.usuario.cart));

          this.loggedIn$.next(true);
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

  getUserById(id: number): Observable<UserI> {
    return this.http.get<UserI>(this.baseUrl + '/usuario/user/' + id);
  }

  getAllUsers(): Observable<UserI[]> {
    return this.http.get<UserI[]>(this.baseUrl + '/usuario/user');
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + '/usuario/' + id);
  }
}
