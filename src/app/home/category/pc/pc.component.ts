import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-pc',
  templateUrl: './pc.component.html',
  styleUrls: ['./pc.component.css']
})
export class PcComponent implements OnInit {

  p: number = 1;

  public products$;
  showSpinner:boolean=true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$=this.getProducts();
    this.products$.subscribe(()=>this.showSpinner=false);
    }

  getProducts(){

    return this.productService.getProductsPc();
  }
}
