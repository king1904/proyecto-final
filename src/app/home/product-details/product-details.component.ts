import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';
 import { CompraService } from 'src/app/compra.service';
import { AuthService } from 'src/app/auth.service';
import { ProductI } from 'src/app/models/product';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit , OnDestroy{

  private routeSub: Subscription;
  private productSub: Subscription;


loggedIn:boolean=false;

  cartItems=0;
  private productId:number;
  public productoActual:ProductI;

  constructor(private route: ActivatedRoute,private productService:ProductService,
    private compraService:CompraService,private authService:AuthService) {}


  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      //console.log(params['id']) //log the value of id
      this.productId=params["id"];
    });

    this.getProductById(this.productId) //log the entire params object

    this.authService.loggedIn$.subscribe(data=>{
      this.loggedIn=data;
    })
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.productSub.unsubscribe();
   }

  getProductById(id:number){
    this.productSub= this.productService.getProductById(id).subscribe((data:ProductI) =>{
      console.log(data)
      this.productoActual=data;
    })

  }

  addToCart(){
    this.compraService.addCart(this.productoActual.id).subscribe((data : any)=>{

      this.compraService.cartItemsSubject.next(data.products.length);

       console.log(data)
    })






  }

 /*  addToCart(){
    this.compraService.addCart(this.productoActual.id).subscribe((data : any)=>{
      this.cartItems=data.products.length;
    })

    this.cartItems++;
    let ids:number[]=[];

    JSON.parse(localStorage.getItem("cart")).array.forEach(element => {
      ids.push(element.id);
    });

    let idSet=new Set(ids);

    this.compraService.cartItemsSubject.next(idSet.size);



  } */

}
