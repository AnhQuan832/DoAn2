import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { LandingComponent } from './landing/landing.component';
import { ShopViewComponent } from './shop-view/shop-view.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CartComponent } from './cart/cart.component';
import { UserLayoutComponent } from './user-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { GalleriaModule } from 'primeng/galleria';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    LandingComponent,
    ShopViewComponent,
    ProductDetailComponent,
    UserProfileComponent,
    CartComponent,
    UserLayoutComponent
  ],
  imports: [
    CommonModule,
    UserLayoutRoutingModule,
    SharedModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    FormsModule,
    DataViewModule,
    GalleriaModule,
    RatingModule,
    InputNumberModule
  ]
})
export class UserLayoutModule { }
