import { Product } from "./product";

export class OrderItem {
  productId?: string;
  productName?: string;
  productCategory?: string;
  productSubCategory?: string;
  units?: number;
  unitPrice?: number;
  subTotalPrice?: number;
  extras?: boolean;
  extraProducts?: any[];

  constructor(product: Product, units = 1) {
    this.productId = product.id;
    this.productName = product.name;
    this.productCategory = product.category;
    this.productSubCategory = product.subcategory;
    this.units = units;
    this.unitPrice = product.price;
    this.subTotalPrice = product.price*units;
    this.extras = product.extras;
    this.extraProducts = [];
  }
}
