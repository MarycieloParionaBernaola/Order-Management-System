import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDoneAlertService {
  public OrdenDoneAlertSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  alert = this.OrdenDoneAlertSource.asObservable();

  constructor() { }

  orderAlert (event: any) {
    if (event) event = true;
    this.OrdenDoneAlertSource.next(event);
    console.log(this.OrdenDoneAlertSource.getValue())
  }
}
