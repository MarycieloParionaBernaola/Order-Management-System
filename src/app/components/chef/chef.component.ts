import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.scss']
})
export class ChefComponent implements OnInit {

  public orders: any = [];

  constructor(private db: FirestoreService) { }

  ngOnInit(): void {
    this.db.getOrders().subscribe(result => {
      result.forEach((e:any)=>e.timeReceived = e.timeReceived.toDate())
      this.orders = result;
      console.log(this.orders);
    })
  }

}
