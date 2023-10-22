import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/service/storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less']
})
export class ProductDetailComponent implements OnInit {
  product;
  listImg;
  numberOfProduct = 1;
  isLoading = false;

  constructor(private storageService: StorageService, private router: Router) { }
  ngOnInit(): void {
    this.initialize();
  }


  initialize() {
    this.product = this.storageService.getItemLocal("currentProduct");
    console.log(this.product)
  }
}
