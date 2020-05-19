import { Component, OnInit } from '@angular/core';
import { CompraService } from 'src/app/compra.service';
import { Subject, Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ProductI } from 'src/app/models/product';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;

  cartObservable = new Observable<ProductI[]>();
  cartItems:ProductI[]=[];
  showSuccess: boolean;

  constructor(private compraService:CompraService,private authService:AuthService) { }

  ngOnInit(): void {
    this.initConfig();
    this.authService.userData.subscribe(data=>{
      this.cartItems=data.cart.products;
    })


  }

  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'AWrHX1bd_TlF4ZXAB9WC3qY3112ZR14xk0pbmuymv2as8y49n22mHiYpC5uLeyM7AWE3sCSNyY6AtIxC',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        },

        {
          amount: {
            currency_code: 'EUR',
            value: '23.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '23.99'
              }
            }
          },
          items: [
            {
              name: 'Mi Producto!!',
              quantity: '3',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '23.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical',
      size: 'small',
      color: 'gold',
      shape: 'pill',
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }




  deleteItem(pos :number){
    let ids:number[]=JSON.parse(localStorage.getItem("cart"));
    let newIds=[]
    let newSet=new Set(ids);


      let idDelete=this.cartItems[pos].id;

    for(let id of ids){
      if(id!=idDelete)   newIds.push(id);
    }

    localStorage.setItem("cart1",JSON.stringify( newIds ))

    this.compraService.cartItemsSubject.next((newSet.size-1 ))

    this.cartItems.splice(pos, 1);
  }


}
