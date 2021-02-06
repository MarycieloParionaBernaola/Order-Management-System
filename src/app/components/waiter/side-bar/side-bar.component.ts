import { Component, OnInit } from '@angular/core';
import { faSun, faCloudSun, faCoffee, faAppleAlt, faHamburger,
  faUtensils, faBreadSlice, faTh, faWineBottle, faBeer } from '@fortawesome/free-solid-svg-icons';
import { FilterProductsService } from '../../../services/filter-products.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})

export class SideBarComponent implements OnInit {

  iconName: String;
  public selectedIcon!: any[];

  public icons: Array<any> = [
    {name: 'All', img: faTh},
    {name: 'Breakfast', img: faSun, menu: 'breakfast'},
    {name: 'Rest of the day', img: faCloudSun, menu: 'rest of the day'},
    {name: 'Coffees', img: faCoffee, subcategory: 'coffees'},
    {name: 'Juices', img: faAppleAlt, subcategory: 'juices'},
    {name: 'Local drinks', img: faBeer, subcategory: 'local drinks'},
    {name: 'Bottle drinks', img: faWineBottle, subcategory: 'bottle drinks'},
    {name: 'Burgers', img: faHamburger, subcategory: 'burgers'},
    {name: 'Sandwiches', img: faBreadSlice, subcategory: 'sandwiches'},
    {name: 'Side', img: faUtensils, subcategory: 'side'},
  ]

  constructor(private filterProductsService: FilterProductsService) { }

  ngOnInit(): void {
    this.filterProductsService.filterProducts.subscribe(result => {
      this.selectedIcon = result;
    });
  }

  onSelect(icon: any): void {
    this.iconName = icon.name;
    this.selectedIcon = icon;
    this.filterProductsService.getIcon(this.selectedIcon);
    console.log(this.selectedIcon)
  }

}
