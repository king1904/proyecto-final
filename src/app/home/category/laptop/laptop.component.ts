import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css'],
})
export class LaptopComponent implements OnInit {
  public products$;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.getProducts();
  }

  getProducts() {
    return this.productService.getProductsLaptop();
  }
}
