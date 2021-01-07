import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.scss']
})
export class ProductsCategoryComponent implements OnInit {

  public productId: string;
  public categoryName: string;
  selectedProduct: any = [];
  showScroll: boolean;

  // Using output decorator and event emitter to send selected product to parent component (products)
  @Output() selectedProductEmitter = new EventEmitter<Product>()

  // Receiving data from parent component (products)
  @Input() productsByCategory: Product[]

  constructor() { }

  ngOnInit(): void { }

  // Sending selected product to parent component (products)
  sendSelectedProduct(product: Product) {
    this.productId = product.id;
    this.selectedProduct = product;
    this.selectedProductEmitter.emit(this.selectedProduct);
  }

}
