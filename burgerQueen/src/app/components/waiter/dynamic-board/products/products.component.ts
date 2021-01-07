import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { FilterProductsService } from '../../../../services/filter-products.service';
import { SearchProductsService } from '../../../../services/search-products.service';
import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: any = [];
  public drinks: any = [];
  public foods: any = [];
  public convertedProducts: any = [];
  selectedProduct: any = [];
  productId: String;
  selectedIcon: any = [];

  constructor(public productService: ProductService, private orderService: OrderService,
    private filterProductsService: FilterProductsService, private searchProductsService: SearchProductsService) {
   }

  ngOnInit(): void {

    // Getting all products and filtering by drinks and foods
    this.productService.getProducts().subscribe(products => {
      for (let i = 0; i < products.length; i++) {
        products[i].category === 'drinks' ?  this.drinks.push(products[i]) : this.foods.push(products[i])
      }
      this.products = products
    });

    // Getting icon pressed and filtering by menu and subcategory
    this.filterProductsService.filterProducts.subscribe(result => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].name === 'All') {
          this.convertedProducts = [];
        }
        if (result[i].menu) {
          this.convertedProducts = this.products.filter((e: any) => e.menu === result[i].menu)
        }
        if (result[i].subcategory) {
          this.convertedProducts = this.products.filter((e: any) => e.subcategory === result[i].subcategory)
        }
      }
       console.log(this.convertedProducts);
    });

    // Getting input of search bar and searching in product list
    this.searchProductsService.searchProducts.subscribe(result => {
      for (let i = 0; i < result.length; i++) {
        this.convertedProducts = this.products.filter((e: any) => e.name.toLowerCase().includes(result[i].toLowerCase()));
        if (this.convertedProducts.length === 0) {
          this.convertedProducts = -1;
        }
        if (result[i] === '') {
          this.convertedProducts = [];
        }
      }
      console.log(this.convertedProducts);
    });

    // Subscribing to order service
    this.orderService.orderItems.subscribe(result => { this.selectedProduct = result });
  }

  onSelect(product: any) {
    this.selectedProduct = [product];
    this.orderService.getItem(this.selectedProduct);
  }

}


