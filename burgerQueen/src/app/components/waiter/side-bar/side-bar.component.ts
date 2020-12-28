import { Component, OnInit } from '@angular/core';
import { faCoffee, faHamburger, faUtensils, faBreadSlice } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  icons: Array<any> = [
    {name: 'Coffee', img: faCoffee},
    {name: 'Burger', img: faHamburger},
    {name: 'Sandwich', img: faBreadSlice},
    {name: 'Dinner', img: faUtensils},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
