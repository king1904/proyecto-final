import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector : Injector,private router:Router) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService=this.injector.get(AuthService);
    let tokenizedReq;
    if(authService.getToken()){
     tokenizedReq= req.clone({
      setHeaders:{
        Authorization: `Bearer ${authService.getToken()}`

            }
    });

  }else{
    tokenizedReq=req;
  }
    return next.handle(tokenizedReq).pipe(
      catchError(
        (err, caught) => {
          if (err.status === 401){
            this.handleAuthError();
            return of(err);
          }
          throw err;
        }
      )

    );
  }





private handleAuthError() {
localStorage.removeItem("token");
this.router.navigateByUrl('login');
}


}
