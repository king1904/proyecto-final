import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css']
})
export class LaptopComponent implements OnInit {

  p: number = 1;

  public products$;
  showSpinner:boolean=true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$=this.getProducts();
    this.productService.getProducts().subscribe(()=>this.showSpinner=false);
    }

  getProducts(){

    return this.productService.getProductsLaptop();
  }
}
