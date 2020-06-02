import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    roles: new FormControl('ROLE_USER'),

    img: new FormControl(
      'https://img.favpng.com/25/7/23/computer-icons-user-profile-avatar-image-png-favpng-LFqDyLRhe3PBXM0sx2LufsGFU.jpg'
    ),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onRegister(): void {
    let userSent = {
      username: this.registerForm.value.username,
      userDetails: {
        firstname: this.registerForm.value.firstname,
        lastname: this.registerForm.value.lastname,
        img: {
          name: this.registerForm.value.img,
        },
      },
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      roles: this.registerForm.value.roles,
    };

    this.authService.register(userSent).subscribe(
      (res) => {
        this.authService.login(
          this.registerForm.value.email,
          this.registerForm.value.password
        );

        this.snackBar.open(
          'Enhorabuena!!!!, se ha registrado correctamente',
          'OK',
          {
            duration: 4000,
          }
        );
      },
      (error) => {
        console.log(error);

        this.snackBar.open('Ha ocurrido un error!!!', 'OK', {
          duration: 4000,
        });
      }
    );
  }
}
