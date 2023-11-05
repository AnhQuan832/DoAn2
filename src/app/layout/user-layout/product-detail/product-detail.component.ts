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
  listVarieties;
  listColor: any[] = [];
  listSize: any[] = [];
  selectedVariety;
  isActiveColor = false;
  isActiveSize = false;
  constructor(private storageService: StorageService, private router: Router) { }
  ngOnInit(): void {
    this.initialize();
  }


  initialize() {
    this.product = this.storageService.getItemLocal("currentProduct");
    console.log(this.product.varieties)
    this.listVarieties = this.product.varieties;
    // this.product.varieties.forEach(vari => {
    //   if (Array.isArray(vari.varietyAttributes)) {
    //     this.listColor.push(vari.varietyAttributes[1])
    //     this.listSize.push(vari.varietyAttributes[0])
    //   }
    // });
  }

  onAttribute(event, data, type) {
    const items = document.querySelectorAll(`.${type}`)
    items.forEach((item) => {
      item.classList.remove("active")
      item.removeAttribute("style");
    })
    event.srcElement.classList.add("active")
  }

  toggleActiveColor() {
    this.isActiveColor = !this.isActiveColor;
  }

  toggleActiveSize() {
    this.isActiveSize = !this.isActiveSize;
  }

}
