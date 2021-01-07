import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterProductsService {
  public filterProductsSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  filterProducts = this.filterProductsSource.asObservable();

  constructor() { }

  getIcon (icon: any) {
    this.filterProductsSource.next([icon]);
    console.log(this.filterProductsSource.getValue())
  }
}
