import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public products$;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.getProducts();
  }

  getProducts() {
    return this.productService.getProducts();
  }
}
