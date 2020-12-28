import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc!: AngularFirestoreDocument<Product>;


  constructor(public db: AngularFirestore) {
    this.productsCollection = this.db.collection('products');
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
}
