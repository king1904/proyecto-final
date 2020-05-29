import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-pc',
  templateUrl: './pc.component.html',
  styleUrls: ['./pc.component.css']
})
export class PcComponent implements OnInit {


  public products$;
  showSpinner:boolean=true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$=this.getProducts();
     }

  getProducts(){

    return this.productService.getProductsPc();
  }
}
