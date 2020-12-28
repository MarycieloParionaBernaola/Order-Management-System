import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routing
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/waiter/side-bar/side-bar.component';
import { WaiterComponent } from './components/waiter/waiter.component';
import { ChefComponent } from './components/chef/chef.component';
import { DynamicBoardComponent } from './components/waiter/dynamic-board/dynamic-board.component';
import { ProductsComponent } from './components/waiter/dynamic-board/products/products.component';
import { OrderListComponent } from './components/waiter/order-list/order-list.component';
import { OrderComponent } from './components/waiter/order/order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    WaiterComponent,
    ChefComponent,
    DynamicBoardComponent,
    ProductsComponent,
    OrderListComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // Initialize Firebase
    AngularFirestoreModule, // Firestore
    FontAwesomeModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
