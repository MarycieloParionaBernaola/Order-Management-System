import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDoneAlertService } from '../../services/order-done-alert.service';
import { faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  notificationIcon = faBell;
  mobile: boolean;
  alertClicked: any;

  constructor(public router: Router, private orderDoneAlertService: OrderDoneAlertService) { }

  ngOnInit(): void {
    if (window.screen.width <= 768) {
    this.mobile = true;
  }
    this.orderDoneAlertService.alert.subscribe(result => {
      this.alertClicked = result;
    });
  }


  alertOrderDone (event:any) {
    this.alertClicked = event;
    this.orderDoneAlertService.orderAlert(this.alertClicked);
    console.log(this.alertClicked)
  }

}
