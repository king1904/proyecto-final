import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {  BehaviorSubject, Observable } from 'rxjs';
import { ProductI } from './models/product';
import { CartI } from './models/cart';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
cartProducts:ProductI[];

sessionCartItems;

comprasArray;
comprasId:number[]=[];



cartItemsSubject = new BehaviorSubject<number>(0);

AUTH_SERVER:string="http://localhost:8080/backend/service";


  constructor(private http: HttpClient) {

    if(localStorage.getItem("user_data")&&JSON.parse(localStorage.getItem("user_data")).cart){
    this.getCartById(JSON.parse(localStorage.getItem("user_data")).cart.id).subscribe(data=>{
      this.cartProducts=data.products;
      this.cartItemsSubject.next(data.products.length);
    })
   }


}



/* getCartProductslocal() {

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

} */





addProduct(product){
  return this.http.post(this.AUTH_SERVER+"/productos/",product);
}

/*   addCart(productId:number){

      this.cartProducts.push(productId);

      localStorage.setItem("cart"+JSON.parse( localStorage.getItem("user_data")).id ,JSON.stringify( this.cartProducts) );

  }
 */

addCart(productId:number){
  let cartId= JSON.parse(localStorage.getItem("user_data")).cart.id;

  return this.http.get<CartI>(`${this.AUTH_SERVER}/cart/${cartId}/${productId}`);


}

deleteProductFromCart(productId:number){
  let cartId= JSON.parse(localStorage.getItem("user_data")).cart.id;
  return this.http.delete<CartI>(`${this.AUTH_SERVER}/cart/${cartId}/${productId}`);
}



  getMisCompras(id :number){

    return this.http.get<any>(this.AUTH_SERVER+"/compra/"+id);
  }


getProductoById(id:number){
  return this.http.get<any>(this.AUTH_SERVER+"/productos/"+id)
        .pipe(map(data => {
          this.sessionCartItems=data;
            return data;
        }))

}

//No lo estoy usando por ahora porque estoy usando el local storage
getCartById(id:number){
  return this.http.get<any>(this.AUTH_SERVER+"/cart/"+id)
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
