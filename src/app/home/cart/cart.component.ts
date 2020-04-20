import { Component, OnInit } from '@angular/core';
import { CompraService } from 'src/app/compra.service';
import { Product } from 'src/app/product.interface';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartObservable = new Observable<Product[]>();
  cartItems:Product[]=[];

  constructor(private compraService:CompraService) { }

  ngOnInit(): void {
   this.cartItems= this.compraService.getCartProducts() ;


  }


  deleteItem(pos :number){
    let ids:number[]=JSON.parse(localStorage.getItem("cart"+JSON.parse(localStorage.getItem("user_data")).id));
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
