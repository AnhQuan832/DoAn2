import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { LandingComponent } from './landing/landing.component';
import { ShopViewComponent } from './shop-view/shop-view.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CartComponent } from './cart/cart.component';
import { SharedModule } from 'primeng/api';


@NgModule({
  declarations: [
    LandingComponent,
    ShopViewComponent,
    ProductDetailComponent,
    UserProfileComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    UserLayoutRoutingModule,
    SharedModule
  ]
})
export class UserLayoutModule { }
