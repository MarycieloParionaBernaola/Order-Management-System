import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  public productsCollection: AngularFirestoreCollection<Product>;
  public products: Observable<Product[]>;
  public productDoc!: AngularFirestoreDocument<Product>;

  constructor(public db: AngularFirestore) {
    this.productsCollection = this.db.collection('products', (ref) =>
    ref.orderBy('code'));
    this.products = this.productsCollection.snapshotChanges().pipe(map(actions => {
     return actions.map(a => {
       const data = a.payload.doc.data() as Product;
       data.id = a.payload.doc.id;
       return data;
     });
   }));
  }

  getProducts() {
    return this.products;
  }

  setOrder(order: any){
    this.db.collection('orders').add(order).then((docRef: any) => {
      console.log(docRef.id);
    }).catch((error) => {
      console.log(error);
    })
  }

}

