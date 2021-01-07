import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Reactive form
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Fontawesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Components
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/waiter/side-bar/side-bar.component';
import { WaiterComponent } from './components/waiter/waiter.component';
import { ChefComponent } from './components/chef/chef.component';
import { DynamicBoardComponent } from './components/waiter/dynamic-board/dynamic-board.component';
import { ProductsComponent } from './components/waiter/dynamic-board/products/products.component';
import { OrderListComponent } from './components/waiter/order-list/order-list.component';
import { OrderComponent } from './components/waiter/order/order.component';
import { ProductsCategoryComponent } from './components/waiter/dynamic-board/products/products-category/products-category.component';


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
    OrderComponent,
    ProductsCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
