import { Component, OnInit } from '@angular/core';
import { SearchProductsService } from '../../../services/search-products.service';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchIcon = faSearch;
  inputValue: any;
  searchInput: string;
  cancelIcon = faTimes;


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
    this.searchProductsService.getInputValue(this.inputValue);
  }

}
