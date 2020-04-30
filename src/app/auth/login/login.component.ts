import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../auth.service";
import { FormGroup, FormControl } from '@angular/forms';
import { CompraService } from 'src/app/compra.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl:string;


  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
});

  constructor(private authSerive: AuthService,private router :Router   ,
         private route: ActivatedRoute ,private compraService :CompraService) { }

  ngOnInit(): void {
    this.compraService.getCartProducts();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  onLogin( ):void{
    console.log(this.loginForm.value)

    this.authSerive.login1(this.loginForm.value.email,this.loginForm.value.password).subscribe(
      res=>{
       console.log(res);
       this.authSerive.loggedIn$.next(true);


       this.router.navigateByUrl(this.returnUrl);
       this.authSerive.getUserData(this.loginForm.value.email).subscribe(data=>   {

         if(data.roles=="ROLE_ADMIN")       { this.authSerive.isAdmin$.next(true)};

        localStorage.setItem("user_data",  JSON.stringify(data));

        this.authSerive.userData.next(JSON.parse(localStorage.getItem("user_data")));

    });
      },error=>{
        console.log(error);


      }
    ); ;


  }

}
