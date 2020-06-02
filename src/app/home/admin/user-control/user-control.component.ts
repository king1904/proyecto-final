import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { UserI } from 'src/app/shared/backendModels/interfaces';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.css'],
})
export class UserControlComponent implements OnInit {
  isLoading: boolean = true;
  users$: UserI[];
  p:number=1;
  activeArray: boolean[] = [];
  roleArray: string[] = [];

  constructor(private authService: AuthService, public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getUsers().subscribe((data) => {
      this.users$ = data;
      data.forEach((user) => {
        this.activeArray.push(user.active);
        this.roleArray.push(user.roles);
      });

      console.log(data);
      console.log(this.activeArray);
      console.log(this.roleArray);

      this.isLoading = false;
    });
  }

  getUsers() {
    return this.authService.getAllUsers();
  }

  deleteUser(id: number) {
    this.authService.deleteUser(id).subscribe(
      (data) => {
        this.getUsers().subscribe((data) => {
          this.users$ = data;
        });

        this.snackBar.open('Usuario borrado con éxito!!!', 'OK', {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open('Ha Ocurrido un error!!!', 'OK', {
          duration: 3000,
        });
      }
    );
  }

  updateUser(userId: number, role: string, active: boolean) {
    let user = {
      roles: role,
      active: active,
    };

    this.authService.adminUpdateUser(userId, user).subscribe(
      (data) => {
        this.getUsers().subscribe((data) => {
          this.users$ = data;
        });

        this.snackBar.open('Usuario actualizado con éxito!!!', 'OK', {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open('Ha Ocurrido un error!!!', 'OK', {
          duration: 3000,
        });
      }
    );
  }

  selectActive(value, pos) {
    this.activeArray[pos] = value;
  }

  selectRole(value, pos) {
    this.roleArray[pos] = value;
  }
}
