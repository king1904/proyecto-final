import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-holder',
  templateUrl: './product-holder.component.html',
  styleUrls: ['./product-holder.component.css']
})
export class ProductHolderComponent implements OnInit {

  p: number = 1;

  @Input() public products$;
  showSpinner:boolean=true;

  constructor( ) { }

  ngOnInit(): void {

     this.products$.subscribe(()=>this.showSpinner=false);
    }


}
