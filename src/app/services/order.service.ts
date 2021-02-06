import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public orderItemsSource: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  orderItems = this.orderItemsSource.asObservable();

  constructor() { }

  getItem (product: any) {

    let itemArr: Item[] = [];

    const itemObj = {
      productId: product[0].id,
      productCategory: product[0].category,
      productSubCategory: product[0].subcategory,
      productName: product[0].name,
      units: 1,
      unitPrice: product[0].price,
      subTotalPrice: product[0].price,
      extra: product[0].extra,
    }

    product[0].subcategory !== 'burgers' ? itemArr.push(itemObj) : itemArr.push({...itemObj, extraProduct: '', kindOfMeat: '' })
    this.orderItemsSource.next(itemArr);
    // console.log(this.orderItemsSource.getValue());
  }

}



