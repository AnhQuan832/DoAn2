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
@NgModule({
  declarations: [
    FooterComponent,
    NavBarComponent,
    ProductCardComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    RatingModule,
    FormsModule,
    TableModule
  ],
  exports: [
    FooterComponent,
    NavBarComponent,
    ProductCardComponent
  ]
})
export class SharedModule { }
