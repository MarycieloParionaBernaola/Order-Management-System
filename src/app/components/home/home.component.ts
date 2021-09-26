import { Component, OnInit } from '@angular/core';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  signIcon = faSignInAlt;

  constructor() { }

  ngOnInit(): void {
  }

}
