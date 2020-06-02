import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { CompraService } from 'src/app/shared/services/compra.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProductI } from 'src/app/shared/backendModels/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  loggedIn: boolean = false;

  isLoading = true;
  cartItems = 0;
  private productId: number;
  public productoActual: ProductI;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private compraService: CompraService,
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {

      this.productId = params['id'];
    });

    this.getProductById(this.productId).subscribe((data) => {
      this.productoActual = data;
      this.isLoading = false;
    });

    this.authService.loggedIn$.subscribe((data) => {
      this.loggedIn = data;
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  getProductById(id: number) {
    return this.productService.getProductById(id);
  }

  addToCart() {
    this.compraService.addCart(this.productoActual.id).subscribe(
      (data: any) => {
        this.compraService.cartItemsSubject.next(data.products.length);

        this.snackBar.open('Se ha añadido al carrito con éxito !!!', 'OK', {
          duration: 4000,
        });
      },
      (error) => {
        this.snackBar.open('Ha ocurrido un error !!!', 'OK', {
          duration: 4000,
        });
        console.log(error);
      }
    );
  }
}
