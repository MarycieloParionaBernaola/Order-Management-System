import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchProductsService } from '../../services/search-products.service';
import { OrderDoneAlertService } from '../../services/order-done-alert.service';
import { faSearch, faTimes, faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchIcon = faSearch;
  cancelIcon = faTimes;
  notificationIcon = faBell;
  mobile: boolean;
  inputValue: any;
  searchInput: string;
  alertClicked: any;

  constructor(public router: Router, private searchProductsService: SearchProductsService, private orderDoneAlertService: OrderDoneAlertService) { }

  ngOnInit(): void {
    if (window.screen.width <= 600) {
    this.mobile = true;
  }
    this.searchProductsService.searchProducts.subscribe(result => {
      this.inputValue = result;
    });

    this.orderDoneAlertService.alert.subscribe(result => {
      this.alertClicked = result;
    });
  }

  onKey(event: any) {
    this.inputValue = event.target.value;
    console.log(this.inputValue);
    this.searchProductsService.getInputValue(this.inputValue);
  }


  clearInput(){
  this.inputValue = '';
  this.searchInput = '';
    console.log(this.inputValue);
    this.searchProductsService.getInputValue(this.inputValue);
  }

  alertOrderDone (event:any) {
    this.alertClicked = event;
    this.orderDoneAlertService.orderAlert(this.alertClicked);
    console.log(this.alertClicked)
  }

}
