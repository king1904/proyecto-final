import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { CompraService } from '../compra.service';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   logged:boolean;
   isAdmin:boolean;

  cartItems$;
  userName ;

  constructor(private authService:AuthService,private router :Router,
    private route: ActivatedRoute,private compraService:CompraService) { }

  ngOnInit(): void {


 this.authService.isAdmin$.subscribe(data=> this.isAdmin=data);


 this.authService.loggedIn$.subscribe(data=> this.logged=data);

this.authService.userData.subscribe(data=>{ if(data){ this.userName=data.username}
else{
  this.userName="Profile";
}})


   this.cartItems$=this.compraService.cartItemsSubject.value;


   this.compraService.cartItemsSubject.subscribe(data=> {this.cartItems$=data;

    })

  }


onLogout(){
  this.authService.loggedIn$.next(false);
  this.authService.isAdmin$.next(false);

  this.authService.logout();
  this.userName="Profile";


}

}
