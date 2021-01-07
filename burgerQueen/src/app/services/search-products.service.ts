import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchProductsService {
  public searchProductsSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  searchProducts = this.searchProductsSource.asObservable();

  constructor() { }

  getInputValue (value: any) {
    this.searchProductsSource.next([value]);
    console.log(this.searchProductsSource.getValue())
  }
}
