import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  message: String;

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onRegister(): void {
    console.log(this.registerForm.value);

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
    };

    this.authService.register(userSent).subscribe(
      (res) => {
        console.log(res);
        this.authService.login(
          this.registerForm.value.email,
          this.registerForm.value.password
        );
        this.message = 'Enhorabuena!!!!, se ha registrado correctamente';
      },
      (error) => {
        console.log(error);
        this.message = 'No se ha registrado correctamente';
      }
    );
  }
}
