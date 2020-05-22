import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ProductI } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url:string="https://tienda-pc.herokuapp.com/backend/service";
  //url:string="http://localhost:8080/backend/service";

  constructor(private http:HttpClient) { }

  getProducts(){

    return this.http.get(this.url+"/productos");
  }

  getProductsPc(){

    return this.http.get(this.url+"/productos/categoria/pc");
  }
  getProductsLaptop(){

    return this.http.get(this.url+"/productos/categoria/laptop");
  }
  getProductsMobile(){

    return this.http.get(this.url+"/productos/categoria/mobile");
  }





  getProductById(id:number){

    return this.http.get<ProductI>(this.url+"/productos/"+id);
  }


  searchHeroes(term: string): Observable<ProductI[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<ProductI[]>(`${this.url}/productos/?nombre=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<ProductI[]>('searchHeroes', []))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


    private log(message: string) {
      console.log(message);
    }
}
