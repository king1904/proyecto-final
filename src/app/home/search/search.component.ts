import { Component, OnInit } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import {
  debounceTime,
  filter,
  tap,
  takeUntil,
  map,
  delay,
} from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductI } from 'src/app/shared/backendModels/interfaces';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private productService: ProductService, private router: Router) {}
  public productServerSideCtrl: FormControl = new FormControl();
  /** indicate search operation is in progress */
  public searching = false;

  protected products: ProductI[];

  /** list of banks filtered after simulating server side search */
  public filteredServerSideProducts: ReplaySubject<
    ProductI[]
  > = new ReplaySubject<ProductI[]>(1);

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  /** control for filter for server side. */
  public productServerSideFilteringCtrl: FormControl = new FormControl();

  private searchTerms = new Subject<string>();
  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: ProductI[]) => {
      this.products = data;
    });

    // listen for search field value changes
    this.productServerSideFilteringCtrl.valueChanges
      .pipe(
        filter((search) => !!search),
        tap(() => (this.searching = true)),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map((search) => {
          if (!this.products) {
            return [];
          }

          // simulate server fetching and filtering data
          return this.products.filter(
            (product) => product.nombre.toLowerCase().indexOf(search) > -1
          );
        }),
        delay(500),
        takeUntil(this._onDestroy)
      )
      .subscribe(
        (filteredProducts) => {
          this.searching = false;
          this.filteredServerSideProducts.next(filteredProducts);
          console.log(filteredProducts);
        },
        (error) => {
          // no errors in our simulated example
          this.searching = false;
          // handle error...
        }
      );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  public navToProduct(prodId: string) {
    this.router.navigate([`/home` ]);

    setTimeout(()=>{
      this.router.navigate([`/details/${prodId}` ]);

    },10);
   }

}
