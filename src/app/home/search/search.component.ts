import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';
import { ProductI } from 'src/app/models/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private productService:ProductService) { }

  products$: Observable<ProductI[]>;
  private searchTerms = new Subject<string>();
  ngOnInit(): void {

    this.products$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.productService.searchHeroes(term)),
    );


  }


  search(term: string): void {
    this.searchTerms.next(term);
  }

}
