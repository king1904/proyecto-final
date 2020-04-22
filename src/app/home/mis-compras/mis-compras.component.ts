import { Component, OnInit } from '@angular/core';
import { CompraService } from 'src/app/compra.service';
import { threadId } from 'worker_threads';
import { AuthService } from 'src/app/auth.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent implements OnInit {

   compras:any[];
  comprasArray:any[]=[];
  userId:number=0;

  constructor(private compraService:CompraService,private authService:AuthService) { }

  ngOnInit(): void {

this.authService.userData.subscribe(data=> this.userId=data.id);

    this.compraService.getMisCompras(this.userId).subscribe(data=>{
      for(let id of data){
         this.compraService.getProductoById(id).subscribe(data=>this.comprasArray.push(data))
        }

        })
  }

}
