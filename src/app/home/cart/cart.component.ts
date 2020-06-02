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

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  cartTotal: number = 0;
  items: ItemI[] = [];

  cartObservable = new Observable<ProductI[]>();
  cartItems: ProductI[] = [];
  showSuccess: boolean;
  showCancel: boolean;
  showError: boolean;

  constructor(
    private compraService: CompraService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initConfig();

    /*  this.authService.userData.subscribe(data=>{
      this.cartItems=data.cart.products;
    }) */

    this.compraService
      .getCartById(JSON.parse(localStorage.getItem('user_data')).cart.id)
      .subscribe((data) => {
        this.cartItems = data.products;
        this.setItems(this.cartItems);
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

  setItems(cartItems) {
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
      cartItem.quantity = '1';
      cartItem.unit_amount.value = item.precio.toString();
      cartItem.unit_amount.currency_code = 'EUR';
      this.cartTotal = this.cartTotal + item.precio;
      this.items.push(cartItem);
    });
  }
}
