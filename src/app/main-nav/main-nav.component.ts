import {
  Component,
  OnInit,
  HostBinding,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { CompraService } from '../shared/services/compra.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { UserI } from '../shared/backendModels/interfaces';
import { WebSocketService } from '../shared/services/web-socket.service';
import { TranslocoService } from '@ngneat/transloco';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit, OnDestroy, AfterViewInit {
  isChecked:boolean ;
  logged: boolean;
  isAdmin: boolean;
  sideNavStatus: boolean = false;
  userLoading: boolean = true;
  productsStatus: boolean = false;
  profileStatus: boolean = false;
  themesStatus: boolean = false;
  numeroMensajes: number;
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
    private webSocketAPI: WebSocketService,
    private compraService: CompraService,
    public overlayContainer: OverlayContainer,
    private translocoService: TranslocoService
  ) {}

  ngAfterViewInit(): void {


    this.isChecked
      ? this.translocoService.setActiveLang('es')
      : this.translocoService.setActiveLang('en');
      console.log(this.isChecked)

  }

  @HostBinding('class') componentCssClass;

  ngOnDestroy(): void {
    this.disconnect();
  }

  ngOnInit(): void {

    if (localStorage.getItem('language') == '') {
      localStorage.setItem('language', 'true');
    } else {
      (JSON.parse(localStorage.getItem('language')) === 'true')
        ? (this.isChecked = true)
        : (this.isChecked = false);
        console.log(this.isChecked)
    }

    if (localStorage.getItem('app_theme'))
      this.onSetTheme(localStorage.getItem('app_theme'));

    this.authService.isAdmin$.subscribe((data) => {
      this.isAdmin = data;
    });

    this.authService.loggedIn$.subscribe((data) => {
      this.logged = data;

      this.connect();
      this.webSocketAPI.messagesSubject$.subscribe((data) => {
        if (data.username != null)
          this.webSocketAPI.mensajesNoVistos.push(data);
        this.numeroMensajes = this.webSocketAPI.mensajesNoVistos.length;
      });
    });

    this.authService.userData.subscribe((data) => {
      this.userData = data;
      this.userLoading = false;

      data
        ? (this.userName = this.userData.username)
        : (this.userName = 'Dashboard');
    });

    if (this.logged)
      this.compraService.cartItemsSubject.subscribe((data) => {
        this.cartItems$ = data;
      });
  }

  changeLanguage(isChecked: boolean) {
    if (!isChecked) {
      localStorage.setItem('language', 'true');
      this.translocoService.setActiveLang('es');
    } else {
      localStorage.setItem('language', 'false');
      this.translocoService.setActiveLang('en');
    }
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
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
