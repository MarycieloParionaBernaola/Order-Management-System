import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { faPlay, faStop, faUndoAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-chef',
  templateUrl: './order-chef.component.html',
  styleUrls: ['./order-chef.component.scss']
})
export class OrderChefComponent implements OnInit, OnDestroy {

  @Input() selectedOrder: any;
  items: any = [];

  undo = faUndoAlt;
  counter: number;
  timerRef: any;
  running: boolean = false;
  startText: any = faPlay;

  constructor(public router: Router, private db: FirestoreService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    for (let i = 0; i < this.selectedOrder.items.length; i++) {

      if (this.selectedOrder.items[i].productSubCategory === 'burgers') {
        if (this.selectedOrder.items[i].extra === true && this.selectedOrder.items[i].extraProduct !== '') {
          this.items.push(` ${this.selectedOrder.items[i].units} ${this.selectedOrder.items[i].productName} ${this.selectedOrder.items[i].kindOfMeat} + ${this.selectedOrder.items[i].extraProduct}`)
        } else {
          this.items.push(` ${this.selectedOrder.items[i].units} ${this.selectedOrder.items[i].productName} ${this.selectedOrder.items[i].kindOfMeat}`)
        }

      } else {
        this.items.push(` ${this.selectedOrder.items[i].units} ${this.selectedOrder.items[i].productName}`)
      }
      console.log(this.items)
    }
  }

  startTimer() {
    this.running = !this.running;
    if (this.running) {
      this.startText = faStop;
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
      });
    } else {
      this.startText = faPlay;
      clearInterval(this.timerRef);
    }
  }

  orderReady() {
    this.selectedOrder.preparationTime = this.counter;
    this.selectedOrder.timeDone = Date.now();
    this.selectedOrder.status = 'Done';
    this.db.updateChefTime(this.selectedOrder.orderId, this.selectedOrder.preparationTime, this.selectedOrder.timeDone, this.selectedOrder.status)
  }

  orderDevelired() {
    this.selectedOrder.timeDelivered = Date.now();
    this.selectedOrder.status = 'Delivered';
    this.db.updateWaiterTime(this.selectedOrder.orderId, this.selectedOrder.timeDelivered, this.selectedOrder.status)
  }

  clearTimer() {
    this.running = false;
    this.counter = undefined;
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }


}
