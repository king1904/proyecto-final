import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormGroup, FormControl } from '@angular/forms';

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
  ) {}

  ngOnInit(): void {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin(): void {
    console.log(this.loginForm.value);

    this.authSerive
      .login1(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (user) => {
          console.log(user);
          this.authSerive.loggedIn$.next(true);

          if (JSON.parse( localStorage.getItem("user_data")).roles == 'ROLE_ADMIN') {
            this.authSerive.isAdmin$.next(true);
          }

          this.router.navigateByUrl(this.returnUrl);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
