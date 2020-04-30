import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Observable } from 'rxjs';
import { UserResponse } from 'src/app/models/user-response';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.css']
})
export class UserControlComponent implements OnInit {

  users$:Observable<UserResponse[]>;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  this.users$=this.getUsers();
  }

  getUsers(){
    return this.authService.getAllUsers();
  }

}
