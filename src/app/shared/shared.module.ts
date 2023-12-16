import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { RatingComponent } from './components/rating/rating.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    FooterComponent,
    NavBarComponent,
    ProductCardComponent,
    PageNotFoundComponent,
    RatingComponent,
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    RatingModule,
    FormsModule,
    TableModule,
    MenuModule,
    RatingModule,
    InputTextareaModule,
    ListboxModule,
    ToastModule,
  ],
  exports: [FooterComponent, NavBarComponent, ProductCardComponent],
  providers: [SocialAuthService],
})
export class SharedModule {}
