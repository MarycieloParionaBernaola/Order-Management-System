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
    { name: 'cheese', isDisabled: false},
    { name: 'fried egg', isDisabled: false}
  ];

  constructor() { }

  ngOnInit(): void {  }

  subTotalPrice(item: any) {
    if (item.extraProduct !== '') {
      item.subTotalPrice = item.unitPrice * item.units + item.units;
    } else {
      item.subTotalPrice = item.unitPrice * item.units;
    }
  }

  addUnit(item: any) {
    item.units += 1;
    this.subTotalPrice(item);
  }

  subtractUnit(item: any) {
    if (item.units === 1) {
      this.deleteItem(item.id);
      this.subTotalPrice(item);
    } else {
      item.units -= 1;
      this.subTotalPrice(item);
    }
  }

  deleteItem (itemId: number) { this.deleteItemEmitter.emit(itemId) };

  checkExtra(isChecked: boolean, name: string, item: any) {
    this.extras.forEach((e: any) => { if (e.name !== name) e.isDisabled = !e.isDisabled});
    if (isChecked) {
      this.selectedItem.extraProduct = name;
      this.subTotalPrice(item);
    } else {
      this.selectedItem.extraProduct = '';
      this.subTotalPrice(item);
    }
  }

}
