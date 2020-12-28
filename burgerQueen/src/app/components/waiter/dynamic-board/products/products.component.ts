import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: any = [];

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      console.log(products);
      this.products = products;
    });
  }
}
