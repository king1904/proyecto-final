import { Component, OnInit, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompraService } from '../compra.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeNestedDataSource,
} from '@angular/material/tree';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  url: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Productos',
    children: [
      { name: `Sobremesa`, url: 'category/pc' },
      { name: 'Portatil', url: 'category/laptop' },
      { name: 'Móvil', url: 'category/mobile' },
    ],
    url: '/',
  },
  {
    name: 'Profile',
    children: [
      { name: `My Profile`, url: 'profile' },
      { name: 'Chat', url: 'chat' },
      { name: 'Mis Compras', url: 'compras' },
      { name: 'Añadir Producto', url: 'admin/addProduct' },
      { name: 'App Users', url: 'admin/users' },
      { name: 'Leer Mensajes', url: 'admin/messages' },
      { name: 'Logout', url: '' },

    ],
    url: '/',
  },
  {
    name: 'Home',

    url: 'home',
  },
  {
    name: 'Register',

    url: 'register',
  },
  {
    name: 'Login',

    url: 'login',
  },

];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

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

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      url: node.url,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private compraService: CompraService,
    public overlayContainer: OverlayContainer
  ) {
    this.dataSource.data = TREE_DATA;
  }

  @HostBinding('class') componentCssClass;

  ngOnInit(): void {
    if (localStorage.getItem('app_theme'))
      this.onSetTheme(localStorage.getItem('app_theme'));

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
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
    localStorage.setItem('app_theme', theme);
  }

  onLogout() {
    this.authService.loggedIn$.next(false);
    this.authService.isAdmin$.next(false);

    this.authService.logout();
    this.userName = 'Profile';
  }
}
