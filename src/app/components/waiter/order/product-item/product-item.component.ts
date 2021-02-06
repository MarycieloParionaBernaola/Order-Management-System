import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/models/item';
import { faTrash, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'li[app-product-item]',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() selectedItem: Item;
  @Output() deleteItemEmitter = new EventEmitter<Number>();

  trashIcon = faTrash;
  plusIcon = faPlusCircle;
  minusIcon = faMinusCircle;

  public meats: any = [
    { kind: ''},
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
    console.log(item)
    if (item.extraProduct !== '' && item.productSubCategory === 'burgers') {
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
