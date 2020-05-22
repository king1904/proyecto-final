import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { CompraService } from '../compra.service';
import { BehaviorSubject } from 'rxjs';
import { CovalentLayoutModule } from '@covalent/core/layout';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  logged: boolean;
  isAdmin: boolean;

  cartItems$;
  userName;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private compraService: CompraService
  ) {}

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((data) => (this.isAdmin = data));

    this.authService.loggedIn$.subscribe((data) => (this.logged = data));

    this.authService.userData.subscribe((data) => {
      if (data) {
        this.userName = data.username;
      } else {
        this.userName = 'Profile';
      }
    });



  if(this.logged)  this.compraService.cartItemsSubject.subscribe((data) => {
     if( data == 0){
      this.compraService.getCartById(JSON.parse(
        localStorage.getItem('user_data')
      ).cart.id).subscribe(data=>{
        this.cartItems$=data.products.length
      });

     }else  (this.cartItems$ = data);
    });

    console.log(this.cartItems$);
  }

  onLogout() {
    this.authService.loggedIn$.next(false);
    this.authService.isAdmin$.next(false);

    this.authService.logout();
    this.userName = 'Profile';
  }
}
