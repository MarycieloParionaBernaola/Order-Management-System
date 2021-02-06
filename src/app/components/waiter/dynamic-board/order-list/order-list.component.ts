import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  public orders: any = [];

  constructor(private db: FirestoreService) { }

  ngOnInit(): void {
    this.db.getOrders().subscribe(result => {
      result.forEach((e:any)=>e.timeReceived = e.timeReceived.toDate())
      this.orders = result.filter((e:any) =>e.status === 'Done')
      console.log(this.orders);
    })
  }

}
