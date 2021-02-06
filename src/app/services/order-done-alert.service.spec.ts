import { TestBed } from '@angular/core/testing';

import { OrderDoneAlertService } from './order-done-alert.service';

describe('OrderDoneAlertService', () => {
  let service: OrderDoneAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDoneAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
