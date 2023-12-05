import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/service/cart.service';
import { StorageService } from 'src/app/core/service/storage.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less'],
})
export class CartComponent implements OnInit {
  cart;
  cartId;
  selectedProducts: any[] = [];
  isLogin: boolean = false;
  originalData: any;
  constructor(
    private cartService: CartService,
    private storageService: StorageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLogin = this.storageService.getDataFromCookie('jwtToken');
    if (this.isLogin) this.getCart();
    else this.router.navigate(['/auth/login']);
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cart = res;
        this.originalData = _.cloneDeep(res);
      },
      error: () => console.log('error'),
    });
  }
  removeItem(data) {
    console.log(data);
    this.cartService.addToCart(-data.quantity, data.varietyId).subscribe({
      next: (res) => {
        this.getCart();
      },
    });
  }

  onGlobalFilter(cart: any, event: Event) {
    cart.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onCheckOut() {
    this.storageService.setItemLocal('cart', this.selectedProducts);
    this.router.navigate(['/user/check-out']);
  }
  onChangeQty(data, value) {
    const current = this.originalData.find(
      (item) => item.cartItemId === data.cartItemId
    );
    if (current.stockAmount < data.quantity) {
      data.quantity = current.quantity;
      console.log(data.quantity);
    } else
      this.cartService
        .addToCart(data.quantity - current.quantity, data.varietyId)
        .subscribe({
          next: () => {
            this.getCart();
          },
          error(err) {},
        });
  }
}
