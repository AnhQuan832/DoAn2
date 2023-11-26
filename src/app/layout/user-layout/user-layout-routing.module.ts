import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout.component';
import { LandingComponent } from './landing/landing.component';
import { ShopViewComponent } from './shop-view/shop-view.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CheckOutComponent } from './check-out/check-out.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: 'home',
        component: LandingComponent
      },
      {
        path: 'shop',
        component: ShopViewComponent
      },
      {
        path: 'product-detail/:id',
        component: ProductDetailComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'profile',
        component: UserProfileComponent
      },
      {
        path: 'check-out',
        component: CheckOutComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
