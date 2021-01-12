import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderItem } from 'src/app/models/order-item';
import { faTrash, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'tr[app-order-item]',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  trashIcon = faTrash;
  plusIcon = faPlusCircle;
  minusIcon = faMinusCircle;

  @Input() selectedItem: OrderItem;
  @Output() deleteItemEmitter = new EventEmitter<Number>();

  public meats: any = [
    { kind: 'meat'},
    { kind: 'beef'},
    { kind: 'chicken'},
    { kind: 'veggie'},
  ];

  public extras: any = [
    { name: 'cheese', value: false},
    { name: 'fried egg', value: false}
  ];

  constructor() { }

  ngOnInit(): void {  }

  subTotalPrice(item: any) {
    if (item.extraProduct !== '') {
      item.subTotalPrice = item.unitPrice * item.units + item.units;
    } else {
      item.subTotalPrice = item.unitPrice * item.units + item.units;
    }
  }

  addUnit(item: any) {
    item.units += 1;
    this.subTotalPrice(item);
  }

  subtractUnit(item: any) {
    item.units -= 1;
    this.subTotalPrice(item);
  };

  deleteItem (itemId: number) { this.deleteItemEmitter.emit(itemId) };

  checkExtra(isChecked: any, name: string, item: any) {
    this.extras.forEach((e: any) => { if(e.name !== name) e.value = !e.value });
  }

}

/*
 // CHECK EXTRA
 checkExtra(obj: any){
  for (let i in this.order) {
    if (this.order[i].id === obj.itemId && obj.isChecked) {
      this.order[i].extraProduct = obj.name;
      this.order[i].subTotalPrice = this.order[i].unitPrice * this.order[i].units + this.order[i].units;
    } else if (this.order[i].id === obj.itemId && !obj.isChecked) {
      this.order[i].extraProduct = '';
      this.order[i].subTotalPrice = this.order[i].unitPrice * this.order[i].units;
}}}
 */
