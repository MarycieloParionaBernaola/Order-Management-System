import { Component, OnInit } from '@angular/core';
import { OrderDoneAlertService } from '../../../services/order-done-alert.service';
import { FilterProductsService } from '../../../services/filter-products.service';
import { SearchProductsService } from '../../../services/search-products.service';

@Component({
  selector: 'app-dynamic-board',
  templateUrl: './dynamic-board.component.html',
  styleUrls: ['./dynamic-board.component.scss']
})
export class DynamicBoardComponent implements OnInit {

  public serviceReceived: any;

  constructor(private orderDoneAlertService: OrderDoneAlertService,
private filterProductsService: FilterProductsService, private searchProductsService: SearchProductsService) { }

  ngOnInit(): void {
    this.orderDoneAlertService.alert.subscribe(result => {
      this.serviceReceived = result;
      console.log(this.serviceReceived)
    });
    this.filterProductsService.filterProducts.subscribe(result => {
      this.serviceReceived = result;
    });
    this.searchProductsService.searchProducts.subscribe(result => {
      this.serviceReceived = result;
    });
  }

}
