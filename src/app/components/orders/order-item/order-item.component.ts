import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'tr[app-order-item]',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() selectedOrder: any;
  items: any = [];

  constructor(private db: FirestoreService) { }

  ngOnInit(): void {
    this.getItems();
    this.getTotalTime();
  }

  getItems() {
    for (let i = 0; i < this.selectedOrder.items.length; i++) {

      if (this.selectedOrder.items[i].productSubCategory === 'burgers') {
        if (this.selectedOrder.items[i].extra === true && this.selectedOrder.items[i].extraProduct !== '') {
          this.items.push(` ( ${this.selectedOrder.items[i].units} ) ${this.selectedOrder.items[i].productName} ${this.selectedOrder.items[i].kindOfMeat} + ${this.selectedOrder.items[i].extraProduct}`)
        } else {
          this.items.push(` ( ${this.selectedOrder.items[i].units} ) ${this.selectedOrder.items[i].productName} ${this.selectedOrder.items[i].kindOfMeat}`)
        }

      } else {
        this.items.push(` ( ${this.selectedOrder.items[i].units} ) ${this.selectedOrder.items[i].productName}`)
      }
      console.log(this.items)
    }
  }

  getTotalTime() {
    if (this.selectedOrder.timeDelivered !== '' )
    this.selectedOrder.totalTime = this.selectedOrder.timeDelivered - this.selectedOrder.timeReceived;
    this.db.updateTotalTime(this.selectedOrder.orderId, this.selectedOrder.totalTime)
  }


}
