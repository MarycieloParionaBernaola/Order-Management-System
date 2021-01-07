import { Component, OnInit } from '@angular/core';
import { SearchProductsService } from '../../services/search-products.service';
import { faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchIcon = faSearch;

  public inputValue!: any[];

  constructor(private searchProductsService: SearchProductsService) { }

  ngOnInit(): void {
    this.searchProductsService.searchProducts.subscribe(result => {
      this.inputValue = result;
    });
  }

  onKey(event: any) {
    this.inputValue = event.target.value;
    console.log(this.inputValue);
    this.searchProductsService.getInputValue(this.inputValue);
  }
}
