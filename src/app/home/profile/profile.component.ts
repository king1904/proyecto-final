import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserI } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user:UserI= JSON.parse(localStorage.getItem("user_data"));;

updateForm = new FormGroup({
  id: new FormControl(this.user.id),
  active: new FormControl(1),
  img: new FormControl(this.user.img),
  firstname: new FormControl(this.user.firstname),
  lastname: new FormControl(this.user.lastname),
  website: new FormControl(this.user.website),
  info: new FormControl(this.user.info),

  username: new FormControl(this.user.username),
  email: new FormControl(this.user.email),
  roles: new FormControl(this.user.roles),
  password: new FormControl(this.user.password),
});


  constructor(private authService:AuthService) { }


  ngOnInit(): void {

       console.log(this.user);
  }

  onSubmit(){
this.authService.updateProfile(this.updateForm.value).subscribe(res=>{
console.log(res);
localStorage.removeItem("user_data");
this.authService.login(this.updateForm.value.email,this.updateForm.value.password);
},error=>{
console.log(error)
})

  }
}
