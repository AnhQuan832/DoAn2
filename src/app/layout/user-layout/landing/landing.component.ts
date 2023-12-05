import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/service/cart.service';
import { StorageService } from 'src/app/core/service/storage.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less'],
})
export class LandingComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    const localCart = this.storageService.getItemLocal('localCart');
    if (localCart) {
      localCart.forEach((item) => {
        this.cartService.addToCart(item.quantity, item.varietyId).subscribe();
      });
      localStorage.removeItem('localCart');
    }
  }
}
