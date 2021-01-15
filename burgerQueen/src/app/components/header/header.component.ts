import { Component, OnInit } from '@angular/core';
import { SearchProductsService } from '../../services/search-products.service';
import { faSearch, faTimes, faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchIcon = faSearch;
  cancelIcon = faTimes;
  notificationIcon = faBell;

  inputValue: any;
  searchInput: string;

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


  clearInput(){
  this.inputValue = '';
  this.searchInput = '';
    console.log(this.inputValue);
    this.searchProductsService.getInputValue( this.inputValue);
    }

}
