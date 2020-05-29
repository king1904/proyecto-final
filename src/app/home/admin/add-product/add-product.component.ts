import { Component, OnInit } from '@angular/core';
import { CompraService } from 'src/app/shared/services/compra.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  message: String;

  productForm = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    img: new FormControl(''),
    roles: new FormControl(''),
    precio: new FormControl(''),
    stock: new FormControl(''),
  });

  constructor(private compraService: CompraService, private route: Router) {}

  ngOnInit(): void {}

  addProduct() {
    this.compraService.addProduct(this.productForm.value).subscribe(
      (data) => {
        this.message = 'Producto añadido con éxito';
        setTimeout(() => {
          this.route.navigateByUrl('/addProduct');
        }, 3000);
      },
      (error) => {
        console.log('No se ha añadido el producto por este error : ' + error);
        this.message = error;
      }
    );
  }
}
