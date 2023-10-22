import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { CouponComponent } from './coupon/coupon.component';
import { AdminLayoutComponent } from './admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [

      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'order',
        component: OrderComponent
      },
      {
        path: 'coupon',
        component: CouponComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
