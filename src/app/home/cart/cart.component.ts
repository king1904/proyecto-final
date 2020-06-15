import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CompraService } from 'src/app/shared/services/compra.service';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProductI, CartI } from 'src/app/shared/backendModels/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ItemI {
  name: string;
  quantity: string;
  category: string;
  unit_amount: UnitAmountI;
}
export interface UnitAmountI {
  currency_code: string;
  value: string;
}
export interface ProductCompra {
  id: number;
  cantidad: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  cartTotal: number = 0;
  items: ItemI[] = [];
  quantityArray: string[] = [];
  isLoading = true;
  cartObservable = new Observable<ProductI[]>();
  cartItems: ProductI[] = [];
  compraProductos: ProductCompra[] = [];
  showSuccess: boolean;
  showCancel: boolean;
  showError: boolean;

  constructor(
    private compraService: CompraService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initConfig();

    console.log(this.items);
    /*  this.authService.userData.subscribe(data=>{
      this.cartItems=data.cart.products;
    }) */

    this.compraService
      .getCartById(JSON.parse(localStorage.getItem('user_data')).cart.id)
      .subscribe((data) => {
        this.cartItems = data.products;
        this.setItems(this.cartItems);
        this.isLoading = false;
      });
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId:
        'ASnUu66TeAqVcnt8wXywZTnFwJO3SUtekhiin0yEs_8UZJORi_bqm5vCYeoFMwJDvbzuLSZSK9wtNSrY',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: this.cartTotal.toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: this.cartTotal.toString(),
                  },
                },
              },
              items: this.items,
              /* [
            {
              name: 'Enterprise cunt',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '19.99',
              },
            },
            {
              name: 'Enterprise 2',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '19.99',
              },
            }
          ] */
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        this.compraService
          .addCompras(
            +JSON.parse(localStorage.getItem('user_data')).compras[0].id,
            { productos: this.compraProductos }
          )
          .subscribe((data) => {
            console.log(data);
            this.compraService.deleteUserCart().subscribe((data: CartI) => {
              this.cartItems = data.products;
              this.compraService.cartItemsSubject.next(data.products.length);
              localStorage.removeItem('item_quantity');
            });
          });

        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log(this.cartTotal);
        console.log('onClick', data, actions);
      },
    };
  }

  deleteItem(pos: number) {
    this.compraService.deleteProductFromCart(pos).subscribe(
      (data: CartI) => {
        this.compraService.cartItemsSubject.next(data.products.length);
        this.cartItems = data.products;

        this.snackBar.open('Has borrado el producto con éxito !!!', 'OK', {
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

  getQuantity(index: number, value) {
    let total = 0;
    let quantityArray = [];
    let i = 0;
    this.items[index].quantity = value.toString();

    this.items.forEach((item) => {
      this.compraProductos[i] = {
        id: 0,
        cantidad: 0,
      };
      this.compraProductos[i].id = +this.cartItems[i].id;
      this.compraProductos[i].cantidad = +item.quantity;

      quantityArray.push(item.quantity);
      total = total + +item.unit_amount.value * +item.quantity;
      i++;
    });
    this.cartTotal = total;

    localStorage.setItem('item_quantity', JSON.stringify(quantityArray));

    console.log(this.cartTotal);
    console.log(this.compraProductos);
  }

  setItems(cartItems) {
    let index = 0;
    let quantityArray = [];
    cartItems.forEach((item) => {
      let cartItem: ItemI = {
        category: '',
        name: '',
        quantity: '',
        unit_amount: {
          currency_code: '',
          value: '',
        },
      };
      cartItem.category = 'DIGITAL_GOODS';
      cartItem.name = item.nombre;

      if (
        localStorage.getItem('item_quantity') &&
        JSON.parse(localStorage.getItem('item_quantity'))[0] != null
      ) {
        cartItem.quantity = JSON.parse(localStorage.getItem('item_quantity'))[
          index
        ].toString();

        quantityArray[index] = cartItem.quantity = JSON.parse(
          localStorage.getItem('item_quantity')
        )[index].toString();
      } else {
        cartItem.quantity = '1';
        quantityArray[index] = 1;
      }

      cartItem.unit_amount.value = item.precio.toString();
      cartItem.unit_amount.currency_code = 'EUR';
      this.items.push(cartItem);
      index++;
    });

    localStorage.setItem('item_quantity', JSON.stringify(quantityArray));

    let total = 0;
    this.items.forEach((item) => {
      total = total + +item.unit_amount.value * +item.quantity;
    });
    this.cartTotal = total;
  }
}
