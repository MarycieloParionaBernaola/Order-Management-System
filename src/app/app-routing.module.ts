import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WaiterComponent } from './components/waiter/waiter.component';
import { ChefComponent } from './components/chef/chef.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  { path: 'waiter', component: WaiterComponent },
  { path: 'chef', component: ChefComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '', component: HomeComponent , pathMatch: 'full'},
  { path: '**', redirectTo: '/', pathMatch: 'full' } // 404 not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
