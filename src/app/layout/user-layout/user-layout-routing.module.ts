import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout.component';
import { LandingComponent } from './landing/landing.component';
import { ShopViewComponent } from './shop-view/shop-view.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ChatComponent } from './chat/chat.component';
import { InvoiceHistoryComponent } from './invoice-history/invoice-history.component';
import { CompletCheckoutComponent } from './complet-checkout/complet-checkout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: 'home',
        component: LandingComponent,
      },
      {
        path: 'shop',
        component: ShopViewComponent,
      },
      {
        path: 'product-detail/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'profile',
        component: UserProfileComponent,
      },
      {
        path: 'check-out',
        component: CheckOutComponent,
      },
      {
        path: 'message',
        component: ChatComponent,
      },
      {
        path: 'invoice-history',
        component: InvoiceHistoryComponent,
      },
      {
        path: 'complete-checkout',
        component: CompletCheckoutComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserLayoutRoutingModule {}
