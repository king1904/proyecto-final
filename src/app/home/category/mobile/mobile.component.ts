import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css'],
})
export class MobileComponent implements OnInit {
  public products$;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.getProducts();
  }

  getProducts() {
    return this.productService.getProductsMobile();
  }
}
