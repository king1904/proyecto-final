import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  returnUrl: string;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authSerive: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin(): void {

    this.authSerive
      .login1(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (user) => {
          this.snackBar.open(
            'Bienvenido ' + user.usuario.username + ' !!!',
            'OK',
            {
              duration: 4000,
            }
          );

          this.authSerive.loggedIn$.next(true);

          if (user.usuario.roles == 'ROLE_ADMIN') {
            this.authSerive.isAdmin$.next(true);
          }

          this.router.navigateByUrl(this.returnUrl);
        },
        (error) => {
          console.log(error);

          this.snackBar.open('Ha ocurrido un error !!!', 'OK', {
            duration: 4000,
          });
        }
      );
  }
}
