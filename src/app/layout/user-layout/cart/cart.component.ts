import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/service/cart.service';
import { StorageService } from 'src/app/core/service/storage.service';

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
  constructor(
    private cartService: CartService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLogin = this.storageService.getDataFromCookie('jwtToken');
    if (this.isLogin)
      this.cartService.getCart().subscribe({
        next: (res) => {
          this.cart = res;
          const localCart = this.storageService.getItemLocal('cart');
          if (localCart) {
            this.cart.push(...localCart);
          }
        },
        error: () => console.log('error'),
      });
    else this.router.navigate(['/auth/login']);
  }
  removeItem(data) {}

  onGlobalFilter(cart: any, event: Event) {
    cart.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onCheckOut() {
    this.storageService.setItemLocal('cart', this.selectedProducts);
    this.router.navigate(['/user/check-out']);
  }
}
