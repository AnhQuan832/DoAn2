import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/service/storage.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less']
})
export class ProductCardComponent {
  @Input() product;


  constructor(private storageService: StorageService, private router: Router) { }

  onCardClick() {
    this.storageService.setItemLocal("currentProduct", this.product);
    this.router.navigate([`user/product-detail/${this.product.productId}`])
  }

}
