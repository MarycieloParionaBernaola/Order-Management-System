import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaiterComponent } from './components/waiter/waiter.component';
import { ChefComponent } from './components/chef/chef.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  { path: 'waiter', component: WaiterComponent },
  { path: 'chef', component: ChefComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '', component: WaiterComponent , pathMatch: 'full'}, // Home
  { path: '**', redirectTo: '/', pathMatch: 'full' } // 404 not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
