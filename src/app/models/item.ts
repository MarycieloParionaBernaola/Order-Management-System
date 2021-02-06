import { Product } from "./product";

export class Item {
  id?: number;
  productId?: string;
  productName?: string;
  productCategory?: string;
  productSubCategory?: string;
  units?: number;
  unitPrice?: number;
  subTotalPrice?: number;
  extra?: boolean;
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
    this.subTotalPrice = product.price;
    this.extra = product.extra;
    this.extraProduct = '';
    this.kindOfMeat = '';
  }
}
