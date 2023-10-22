import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { CouponComponent } from './coupon/coupon.component';
import { OrderComponent } from './order/order.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    ProductComponent,
    CouponComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    SharedModule
  ]
})
export class AdminLayoutModule { }
