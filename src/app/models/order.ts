export interface Order {
  orderId?: string;
  orderNumber?: number;
  clientName?: string;
  tableNumber?: number;
  items?: Array<any>;
  totalPrice?: number;
  status?: string;
  timeReceived?: any;
  preparationTime?: any;
  timeDone?: any;
  timeDelivered?: any;
  totalTime?: any;
}
