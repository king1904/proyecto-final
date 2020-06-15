import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserI } from 'src/app/shared/backendModels/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: UserI;

  updateForm = new FormGroup({
    imgName: new FormControl(""),
    firstname: new FormControl(
      JSON.parse(localStorage.getItem('user_data')).userDetails.firstname
    ),
    lastname: new FormControl(
      JSON.parse(localStorage.getItem('user_data')).userDetails.lastname
    ),
    website: new FormControl(
      JSON.parse(localStorage.getItem('user_data')).userDetails.website
    ),
    info: new FormControl(
      JSON.parse(localStorage.getItem('user_data')).userDetails.info
    ),
    username: new FormControl(
      JSON.parse(localStorage.getItem('user_data')).username
    ),
    email: new FormControl(JSON.parse(localStorage.getItem('user_data')).email),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.authService
      .getUserById(JSON.parse(localStorage.getItem('user_data')).id)
      .subscribe((data) => {
        this.user = data;
        console.log(data);
      });
  }

  onSubmit() {
    let user: UserI = this.authService.userData.value;

    let pass;
    let  imgName;
    this.updateForm.value.imgName.trim() == ''
    ? (imgName= JSON.parse(localStorage.getItem('user_data')).userDetails.img.name)
    : (imgName = this.updateForm.value.imgName);

    this.updateForm.value.password.trim() == ''
      ? (pass = null)
      : (pass = this.updateForm.value.password);

    let userSent = {
      id: JSON.parse(localStorage.getItem('user_data')).id,
      username: this.updateForm.value.username,
      userDetails: {
        id: JSON.parse(localStorage.getItem('user_data')).userDetails.id,
        firstname: this.updateForm.value.firstname,
        lastname: this.updateForm.value.lastname,
        website: this.updateForm.value.website,
        info: this.updateForm.value.info,
        img: {
          id: JSON.parse(localStorage.getItem('user_data')).userDetails.img.id,
          name: imgName,
          originalName: JSON.parse(localStorage.getItem('user_data'))
            .userDetails.img.originalName,
          date: JSON.parse(localStorage.getItem('user_data')).userDetails.img
            .date,
        },
      },
      email: this.updateForm.value.email,

      password: pass,
    };

    this.authService.updateProfile(userSent).subscribe(
      (res) => {
        this.snackBar.open('Tu perfíl se ha actualizado con éxito !!!', 'OK', {
          duration: 4000,
        });
        localStorage.setItem('user_data', JSON.stringify(res));
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
