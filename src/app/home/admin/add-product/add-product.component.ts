import { Component, OnInit } from '@angular/core';
import { CompraService } from 'src/app/shared/services/compra.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductI } from 'src/app/shared/backendModels/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {

  productForm = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    img1: new FormControl(''),
    img2: new FormControl(''),
    img3: new FormControl(''),
    categoria: new FormControl(''),
    precio: new FormControl(''),
    stock: new FormControl(''),
  });

  constructor(
    private compraService: CompraService,
    private route: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  addProduct() {
    let newProduct: ProductI = {
      nombre: this.productForm.value.nombre,
      categoria: this.productForm.value.categoria,
      descripcion: this.productForm.value.descripcion,
      imgs: [
        {
          name: this.productForm.value.img1,
          originalName: '',
        },
        {
          name: this.productForm.value.img2,
          originalName: '',
        },
        {
          name: this.productForm.value.img3,
          originalName: '',
        },
      ],
      precio: this.productForm.value.precio.replace(/,/g, '.'),
      stock: this.productForm.value.stock,
    };
    this.compraService.addProduct(newProduct).subscribe(
      (data) => {
        this.productForm.reset();
        this.snackBar.open('Producto añadido con éxito!!!', 'OK', {
          duration: 4000,
        });
      },
      (error) => {
        console.log('No se ha añadido el producto por este error : ' + error);
        this.snackBar.open('Ha ocurrido un error !!!', 'OK', {
          duration: 4000,
        });
      }
    );
  }
}
