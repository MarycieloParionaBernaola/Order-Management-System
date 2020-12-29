import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}
