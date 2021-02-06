import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  private productsCollection: AngularFirestoreCollection<Product>;
  private products: Observable<Product[]>;
  private ordersCollection: AngularFirestoreCollection<Order>;
  private orders: Observable<Order[]>;
  private orderDoc: AngularFirestoreDocument<Order>;

  constructor(private db: AngularFirestore) {
    this.productsCollection = this.db.collection('Products', (ref) =>
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

  addOrder(order: any){
    this.db.collection('orders').add(order).then((docRef: any) => {
      console.log(docRef.id);
    }).catch((error) => {
      console.log(error);
    })
  }

  getOrders()  {
    this.ordersCollection = this.db.collection('orders', (ref) =>
    ref.orderBy('timeReceived', 'desc'));
    this.orders = this.ordersCollection.snapshotChanges().pipe(map(actions => {
     return actions.map(a => {
       const data = a.payload.doc.data() as Order;
       data.orderId = a.payload.doc.id;
       console.log(data)
       return data;
     });
   }));
   console.log(this.orders)
   return this.orders;
  }

  updateChefTime(orderId: any, preparationTime: any, timeDone: any, status: any) {
    this.db.collection('orders').doc(orderId).update({ preparationTime, timeDone, status })
  }

  updateWaiterTime(orderId: any, timeDelivered: any, status: any) {
    this.db.collection('orders').doc(orderId).update({ timeDelivered, status })
  }

  updateTotalTime(orderId: any, totalTime:any) {
    this.db.collection('orders').doc(orderId).update({ totalTime })
  }

}

