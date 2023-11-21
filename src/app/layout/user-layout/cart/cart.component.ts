import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/service/cart.service';
import { StorageService } from 'src/app/core/service/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
  cart;
  cartId;
  selectedProducts: any[] = [];
  constructor(private cartService: CartService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cart = res.cartItemList;
        this.storageService.setItemLocal("cart", this.cart)
      },
      error: () => console.log("error")
    })
  }
  removeItem(data) {

  }

  onGlobalFilter(cart: any, event: Event) {
    cart.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onCheckOut() {
    this.router.navigate(['/user/check-out'])
  }

}
