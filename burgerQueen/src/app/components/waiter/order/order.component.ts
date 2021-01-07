import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { ProductService } from '../../../services/product.service';
import { FormControl, FormGroup } from '@angular/forms';
import { faTrash, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  trashIcon = faTrash;
  plusIcon = faPlusCircle;
  minusIcon = faMinusCircle;

  public order: any = [];
  public extras: any = [];

  orderForm = new FormGroup({
    clientName: new FormControl(''),
    tableNumber: new FormControl(''),
  });

  constructor(private orderService: OrderService, private productService: ProductService) {  }

  ngOnInit(): void {

    this.orderService.orderItems.subscribe(result => {

      for (let indexResult = 0; indexResult < result.length; indexResult ++) {
        const lastIndex = this.order.map((e: any) => e.productId).lastIndexOf(result[indexResult].productId);
        let productExists = false;

        if(result[indexResult].productCategory === 'extras') {
          this.getExtra(result[indexResult]);
          console.log(this.order);
          productExists = true;
          break;
        }

        if (lastIndex !== -1) {
          this.order[lastIndex].units++
          this.order[lastIndex].subTotalPrice = this.order[lastIndex].unitPrice * this.order[lastIndex].units
          productExists = true;
          break;
        }

        if (!productExists) {
          this.order.push(result[indexResult])
        }

      console.log(this.order);
      }});
  }

  getExtra(extra: any) {
    const lastBurger = this.order.map((e: any) => e.productSubCategory).lastIndexOf('burgers');
    const extraLength = this.order[lastBurger].extraProducts.length;
    this.order[lastBurger].extraProducts.splice(extraLength - 1, 0, extra);
  }

  deleteItem(productId: any) {
    for (let i in this.order) {
    if (this.order[i].productId === productId) {
      this.order.splice(this.order.indexOf(this.order[i]), 1)
    }}}

  addUnit(productId: any) {
    for (let i in this.order) {
    if (this.order[i].productId === productId) {
      this.order[i].units++
      this.order[i].subTotalPrice = this.order[i].unitPrice * this.order[i].units
    }}}

  removeUnit(productId: any) {
    for (let i in this.order) {
    if (this.order[i].productId === productId && this.order[i].units === 1) {
      this.deleteItem(productId)
    } else if (this.order[i].productId === productId) {
      this.order[i].units--
      this.order[i].subTotalPrice -= this.order[i].unitPrice
    }}}

  getTotal () {
    let sum;
    if (this.order.length >=1) {
      sum = this.order.map((a: any) => a.subTotalPrice).reduce(function(a: any, b: any) { return a + b });
      return sum;
    }
    sum = 0;
    return sum;
  }

  sendOrder() {
    this.orderForm.value.items = this.order;
    this.orderForm.value.date = new Date(); //part in date and time!
    this.orderForm.value.total = this.getTotal();
    console.log(this.orderForm.value);
    this.productService.setOrder(this.orderForm.value);
    this.resetForm();
    this.order = [];
  }

  resetForm() {
    this.orderForm.reset();
  }

}


