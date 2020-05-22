import { Component, OnInit, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompraService } from '../compra.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {
  logged: boolean;
  isAdmin: boolean;

  cartItems$;
  userName;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private compraService: CompraService,
    public overlayContainer: OverlayContainer
  ) {}

  @HostBinding('class') componentCssClass;

  ngOnInit(): void {

    if(localStorage.getItem("app_theme")) this.onSetTheme(localStorage.getItem("app_theme"));

    this.authService.isAdmin$.subscribe((data) => (this.isAdmin = data));

    this.authService.loggedIn$.subscribe((data) => (this.logged = data));

    this.authService.userData.subscribe((data) => {
      if (data) {
        this.userName = data.username;
      } else {
        this.userName = 'Profile';
      }
    });

    if (this.logged)
      this.compraService.cartItemsSubject.subscribe((data) => {
        if (data == 0) {
          this.compraService
            .getCartById(JSON.parse(localStorage.getItem('user_data')).cart.id)
            .subscribe((data) => {
              this.cartItems$ = data.products.length;
            });
        } else this.cartItems$ = data;
      });

    console.log(this.cartItems$);
  }

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
    localStorage.setItem("app_theme",theme);
  }


  onLogout() {
    this.authService.loggedIn$.next(false);
    this.authService.isAdmin$.next(false);

    this.authService.logout();
    this.userName = 'Profile';
  }
}
