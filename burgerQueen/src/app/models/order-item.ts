import { Product } from "./product";

export class OrderItem {
  id?: number;
  productId?: string;
  productName?: string;
  productCategory?: string;
  productSubCategory?: string;
  units?: number;
  unitPrice?: number;
  subTotalPrice?: number;
  extraProduct?: String;
  kindOfMeat?: String;

  constructor(id: number, product: Product, units = 1) {
    this.id = id;
    this.productId = product.id;
    this.productName = product.name;
    this.productCategory = product.category;
    this.productSubCategory = product.subcategory;
    this.units = units;
    this.unitPrice = product.price;
    this.subTotalPrice = product.price * units;
    this.extraProduct = '';
    this.kindOfMeat = '';
  }
}
