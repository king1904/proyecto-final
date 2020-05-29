import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductI, CartI } from '../backendModels/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  cartProducts: ProductI[];

  sessionCartItems;

  comprasArray;
  comprasId: number[] = [];

  cartItemsSubject = new BehaviorSubject<number>(0);

  private baseUrl = environment.baseUrlRestServices;

  constructor(private http: HttpClient) {}

  addProduct(product) {
    return this.http.post(this.baseUrl + '/productos/', product);
  }

  addCart(productId: number) {
    let cartId = JSON.parse(localStorage.getItem('user_data')).cart.id;

    return this.http.get<CartI>(`${this.baseUrl}/cart/${cartId}/${productId}`);
  }

  deleteProductFromCart(productId: number) {
    let cartId = JSON.parse(localStorage.getItem('user_data')).cart.id;
    return this.http.delete<CartI>(
      `${this.baseUrl}/cart/${cartId}/${productId}`
    );
  }

  getMisCompras(id: number) {
    return this.http.get<any>(this.baseUrl + '/compra/' + id);
  }

  getProductoById(id: number) {
    return this.http.get<any>(this.baseUrl + '/productos/' + id).pipe(
      map((data) => {
        this.sessionCartItems = data;
        return data;
      })
    );
  }

  //No lo estoy usando por ahora porque estoy usando el local storage
  getCartById(id: number) {
    return this.http.get<any>(this.baseUrl + '/cart/' + id).pipe(
      map((data) => {
        this.comprasArray = data;
        return data;
      })
    );
  }

  getProductosId() {
    let productosId = [];

    this.getMisCompras(
      JSON.parse(localStorage.getItem('user_data')).id
    ).subscribe((data) => {
      for (let compra of data) {
        productosId.push(compra.productId);
      }
    });
    return productosId;
  }
}
