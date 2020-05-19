import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product.interface';
import { CompraService } from 'src/app/compra.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit , OnDestroy{

  private routeSub: Subscription;
  private productSub: Subscription;



  cartItems=0;
  private productId:number;
  public productoActual:Product;

  constructor(private route: ActivatedRoute,private productService:ProductService,
    private compraService:CompraService) {}


  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      //console.log(params['id']) //log the value of id
      this.productId=params["id"];
    });

    this.getProductById(this.productId) //log the entire params object

  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.productSub.unsubscribe();
   }

  getProductById(id:number){
    this.productSub= this.productService.getProductById(id).subscribe((data:Product) =>{
      console.log(data)
      this.productoActual=data
    })

  }

  addToCart(){
    this.compraService.addCart(this.productoActual.id);

    this.cartItems++;
    let ids:number[]=JSON.parse(localStorage.getItem("cart"+JSON.parse(localStorage.getItem("user_data")).id));
    let idSet=new Set(ids);

    this.compraService.cartItemsSubject.next(idSet.size)



  }

}
