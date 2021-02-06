import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public items: any = [];
  orderNumber: any;
  orderForm: FormGroup;
  formData: any;
  submitted: any;
  isSelected: any;


  constructor(private fb: FormBuilder, private db: FirestoreService, private orderService: OrderService) {  }

  ngOnInit(): void {

    this.getOrderNumber();
    this.submitted=false;
    this.isSelected=false;
    this.createForm();

    this.orderService.orderItems.subscribe(result => {
      for (let i = 0; i < result.length; i ++) {
        const lastIndex = this.items.map((e: any) => e.productId).lastIndexOf(result[i].productId);
        let productExists = false;
        if (lastIndex !== -1 && result[i].productSubCategory !== 'burgers') {
          this.items[lastIndex].units++;
          this.items[lastIndex].subTotalPrice = this.items[lastIndex].unitPrice * this.items[lastIndex].units;
          productExists = true;
          break;
        }
        if (!productExists) {
          this.items.push(result[i]);
          this.items.map((value: any, index: any) => value.id = index + 1); // Adding id to item
        }
  }})}


  // DELETE ITEM
  deleteItem(itemId: any) {
    for (let i in this.items) {
      if (this.items[i].id === itemId) this.items.splice(this.items.indexOf(this.items[i]), 1);
  }}


  // GET TOTAL
  getTotal () { return this.items.map((a: any) => a.subTotalPrice).reduce(function(a: any, b: any) { return a + b }); }


  // CREATE REACTIVE FORM
  createForm() {
    this.orderForm = this.fb.group({
      'clientName': ['', [Validators.required]],
      'tableNumber': ['', [Validators.required]],
      'orderDetail': [''],
    })
  }

  get clientName() { return this.orderForm.get('clientName'); }

  get tableNumber() { return this.orderForm.get('tableNumber'); }

  getOrderNumber(){
    this.db.getOrders().subscribe(result => {
      const ordersOfTheDay = result.filter((e: any) => {
        return e.timeReceived.toDate().setHours(0,0,0,0) === new Date().setHours(0,0,0,0);
      })
      this.orderNumber = ordersOfTheDay.length + 1;
      if (this.orderNumber < 10 ) this.orderNumber = '00' + this.orderNumber;
      else if (this.orderNumber < 100) this.orderNumber = '0' + this.orderNumber;
    })
  }

  // SEND ORDER TO FIREBASE
  sendOrder() {
    this.submitted = true;
    this.orderForm.value.number = this.orderNumber;
    this.orderForm.value.items = this.items;
    this.orderForm.value.total = this.getTotal();
    this.orderForm.value.status = 'Pending';
    this.orderForm.value.timeReceived = new Date();
    this.orderForm.value.preparationTime = '';
    this.orderForm.value.timeDone = '';
    this.orderForm.value.timeDelivered = '';
    this.orderForm.value.totalTime = '';
    this.formData = this.orderForm.value;

    if (this.orderForm.valid) {
      this.submitted = false;
      this.db.addOrder(this.formData);
      this.isSelected = true;
      this.orderForm.reset();
      this.items = [];
      alert('Order sent successfully :)')

    } else {
      this.isSelected = false;
      alert('Fill in all the fields!')
    }
  }
}
