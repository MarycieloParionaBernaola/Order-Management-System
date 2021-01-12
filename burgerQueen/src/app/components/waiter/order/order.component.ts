import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public order: any = [];

  orderForm = new FormGroup({
    clientName: new FormControl('', Validators.required),
    tableNumber: new FormControl('', Validators.required),
  });

  constructor(private productService: ProductService, private orderService: OrderService) {  }

  ngOnInit(): void {

    this.orderService.orderItems.subscribe(result => {
      for (let i = 0; i < result.length; i ++) {
        const lastIndex = this.order.map((e: any) => e.productId).lastIndexOf(result[i].productId);
        let productExists = false;
        if (lastIndex !== -1 && result[i].productSubCategory !== 'burgers') {
          this.order[lastIndex].units++;
          this.order[lastIndex].subTotalPrice = this.order[lastIndex].unitPrice * this.order[lastIndex].units;
          productExists = true;
          break;
        }
        if (!productExists) {
          this.order.push(result[i]);
          this.order.map((value: any, index: any) => value.id = index + 1); // Adding id to item
        }
  }})}


  // DELETE ITEM
  deleteItem(itemId: any) {
    for (let i in this.order) {
      if (this.order[i].id === itemId) {
        this.order.splice(this.order.indexOf(this.order[i]), 1);
  }}}

  // GET TOTAL
  getTotal () { return this.order.map((a: any) => a.subTotalPrice).reduce(function(a: any, b: any) { return a + b }); }

  // SEND ORDER TO FIREBASE
  sendOrder() {
    this.orderForm.value.date = new Date();
    this.orderForm.value.time = new Date();
    this.orderForm.value.items = this.order;
    this.orderForm.value.total = this.getTotal();
    console.log(this.orderForm.value);
    this.productService.setOrder(this.orderForm.value);
    this.orderForm.reset();
    this.order = [];
  }
}
