import { Component, OnInit, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { CompraService } from '../shared/services/compra.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { UserI } from '../shared/backendModels/interfaces';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {
  logged: boolean;
  isAdmin: boolean;
  sideNavStatus: boolean = false;
  userLoading: boolean = true;
  productsStatus: boolean = false;
  profileStatus: boolean = false;
  themesStatus: boolean = false;

  cartItems$;
  userName: string = 'Dashboard';
  userData: UserI;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,

    private compraService: CompraService,
    public overlayContainer: OverlayContainer
  ) {}

  @HostBinding('class') componentCssClass;

  ngOnInit(): void {
    if (localStorage.getItem('app_theme'))
      this.onSetTheme(localStorage.getItem('app_theme'));

    this.authService.isAdmin$.subscribe((data) => {
      this.isAdmin = data;
      console.log(data);
    });

    this.authService.loggedIn$.subscribe((data) => (this.logged = data));

    this.authService.userData.subscribe((data) => {
      this.userData = data;
      this.userLoading = false;

      data
        ? (this.userName = this.userData.username)
        : (this.userName = 'Dashboard');
    });

    if (this.logged)
      this.compraService
        .getCartById(this.userData.cart.id)
        .subscribe((data) => {
          this.cartItems$ = data.products.length;
          console.log(data.products.length);

        });

   }

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
    localStorage.setItem('app_theme', theme);
  }

  onLogout() {
    this.authService.loggedIn$.next(false);
    this.authService.isAdmin$.next(false);

    this.authService.logout();
    this.userName = 'Dashboard';
  }
}
