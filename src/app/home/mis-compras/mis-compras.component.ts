import { Component, OnInit } from '@angular/core';
import { CompraService } from 'src/app/compra.service';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent implements OnInit {

  comprasId:number[]=[];
  compras:any[];
  comprasArray:any[]=[];
  constructor(private compraService:CompraService) { }

  ngOnInit(): void {
    this.comprasId=this.compraService.getProductosId();

    setTimeout(()=>{
      console.log(this.comprasId);
      this.asignarCompras();
      console.log(this.comprasArray);
    }
      ,400);










  }

  private asignarCompras(){
    for(let i=0;i<this.comprasId.length;i++){


      this.compraService.getProductoById(this.comprasId[i]).subscribe(data=>{
        this.comprasArray.push(data);
      });
    }
  }



}
