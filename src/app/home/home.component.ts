import { Component, OnInit } from '@angular/core';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  p: number = 1;

  public products$;
  showSpinner:boolean=true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$=this.getProducts();
    this.productService.getProducts().subscribe(()=>this.showSpinner=false);
    }

  getProducts(){

    return this.productService.getProducts();
  }
}
