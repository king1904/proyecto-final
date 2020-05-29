import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs';


import { MatSnackBar } from '@angular/material/snack-bar';
import { UserI } from 'src/app/shared/backendModels/interfaces';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.css']
})
export class UserControlComponent implements OnInit {

  isLoading:boolean=true;
  users$:Observable<UserI[]>;
  constructor(private authService:AuthService,public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  this.users$=this.getUsers();
  }

  getUsers(){
    return this.authService.getAllUsers();
  }

  deleteUser(id:number){
this.authService.deleteUser(id).subscribe(data=>{
  this.users$=this.getUsers();

  this.snackBar.open('Usuario borrado con éxito!!!', 'OK', {
    duration: 3000,
  });


},error=>{
  this.snackBar.open('Ha Ocurrido un error!!!', 'OK', {
    duration: 3000,
  });

})
  }

  updateUser(user){
    this.authService.updateProfile(user).subscribe(data=>{
      this.users$=this.getUsers();

      this.snackBar.open('Usuario actualizado con éxito!!!', 'OK', {
        duration: 3000,
      });
    },(error)=>{
      this.snackBar.open('Ha Ocurrido un error!!!', 'OK', {
        duration: 3000,
      });

    })

  }

}
