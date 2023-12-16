import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { CheckOutComponent } from './check-out/check-out.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DividerModule } from 'primeng/divider';
import { ChatComponent } from './chat/chat.component';
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';
import { InvoiceHistoryComponent } from './invoice-history/invoice-history.component';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    LandingComponent,
    ShopViewComponent,
    ProductDetailComponent,
    UserProfileComponent,
    CartComponent,
    UserLayoutComponent,
    CheckOutComponent,
    ChatComponent,
    InvoiceHistoryComponent,
  ],
  imports: [
    CommonModule,
    UserLayoutRoutingModule,
    SharedModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    FormsModule,
    ReactiveFormsModule,
    DataViewModule,
    GalleriaModule,
    RatingModule,
    InputNumberModule,
    TableModule,
    DialogModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    DropdownModule,
    RadioButtonModule,
    DividerModule,
    AvatarModule,
    CalendarModule,
    TabViewModule,
    ButtonModule,
    RatingModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class UserLayoutModule {}
