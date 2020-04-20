import { Injectable } from '@angular/core';
import { Product } from './product.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {  BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
cartProducts:number[]=[];
cartItems:Product[]=[];

sessionCartItems;

comprasArray;



cartItemsSubject = new BehaviorSubject<number>(0);

AUTH_SERVER:string="http://localhost:8080";


  constructor(private http: HttpClient) {
   if(localStorage.getItem("user_data")){
    if(localStorage.getItem("cart"+JSON.parse( localStorage.getItem("user_data")).id)){
    this.cartProducts=JSON.parse(localStorage.getItem("cart"+JSON.parse( localStorage.getItem("user_data")).id));
  }
   }

   this.cartItems= this.getCartProducts() ;

}


getCartProducts():Product[]{

  if(localStorage.getItem("user_data")){
  let ids:number[]=JSON.parse(localStorage.getItem("cart"+JSON.parse(localStorage.getItem("user_data")).id));
  let idSet=new Set(ids);

  let cartProductos:Product[]=[];
  this.cartItemsSubject.next(idSet.size )





  for( let id of idSet){
    this.getProductoById(id).subscribe(data=> cartProductos.push(data));
  }
  return cartProductos;
}

}

  addCart(productId:number){

      this.cartProducts.push(productId);

      localStorage.setItem("cart"+JSON.parse( localStorage.getItem("user_data")).id ,JSON.stringify( this.cartProducts) );

  }


  getMisCompras(id :number){

    return this.http.get<any>(this.AUTH_SERVER+"/compras/"+id)
        .pipe(map(data => {
           console.log(data)
            return data;
        }))
  }


getProductoById(id:number){
  return this.http.get<any>("http://localhost:8080/productos/"+id)
        .pipe(map(data => {
          this.sessionCartItems=data;
            return data;
        }))

}


getCartByUserId(id:number){
  return this.http.get<any>("http://localhost:8080/cart/"+id)
        .pipe(map(data => {

          this.comprasArray=data;
            return data;
        }))

}



 getProductosId(){
let productosId=[];

   this.getMisCompras(JSON.parse(localStorage.getItem("user_data")).id).subscribe(
   data=>{

      for(let compra of data){
       productosId.push(compra.productId);
      }
     }
 );
 return productosId;
}


}
