import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/core/service/cart.service';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { ProductService } from 'src/app/core/service/product.service';
import { StorageService } from 'src/app/core/service/storage.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less'],
})
export class ProductDetailComponent implements OnInit {
  product;
  listImg;
  numberOfProduct = 0;
  isLoading = false;
  listVarieties;
  listColor: any[] = [];
  listSize: any[] = [];
  selectedColor: any;
  selectedSize: any;
  listDetailVariety: any[] = [];
  attPrice = 0;
  selectedVariety;
  isActiveColor = false;
  isActiveSize = false;
  isLogin: boolean = false;
  isDisableBuy: boolean = false;
  constructor(
    private storageService: StorageService,
    private router: Router,
    private productSerivce: ProductService,
    private cartService: CartService,
    private messageSerice: MessageService,
    private invoiceService: InvoiceService
  ) {}
  ngOnInit(): void {
    this.initialize();
    setTimeout(() => {
      this.setDefaultAttribute();
    }, 1000);
  }

  initialize() {
    this.isLogin = this.storageService.getDataFromCookie('jwtToken');
    this.product = this.storageService.getItemLocal('currentProduct');
    this.listVarieties = this.product?.varieties;
    this.productSerivce.getProductDetail(this.product.productId).subscribe({
      next: (res) => {
        this.product = res;
        this.product.varieties.forEach((item) => {
          this.listDetailVariety.push({ ...item, ...item.varietyAttributes });
        });
        this.product.varietyAttributeList.forEach((item) => {
          if (item.type === 'SIZE')
            this.listSize.push({ ...item, active: true });
          else this.listColor.push({ ...item, active: true });
        });
      },
    });
    if (!this.isLogin)
      // this.cartService.getCart().subscribe({
      //   next: (res) => this.storageService.setItemLocal('cart', res),
      // });
      this.cartService.getUnauthCart().subscribe({
        next: (res) => this.storageService.setItemLocal('cart', res),
      });
  }

  setDefaultAttribute() {
    let colorItem, sizeItem;
    if (this.listColor.length > 0) {
      colorItem = document.getElementById(this.listColor[0].attributeId);
      colorItem.classList.add('active');
      this.selectedColor = this.listColor[0];
    }
    if (this.listSize.length > 0) {
      sizeItem = document.getElementById(this.listSize[0].attributeId);
      sizeItem.classList.add('active');
      this.selectedSize = this.listSize[0];
    }
    this.handleChangeAttribute();
  }
  onAttribute(event, data, type) {
    const items = document.querySelectorAll(`.${type}`);
    items.forEach((item) => {
      item.classList.remove('active');
      item.removeAttribute('style');
    });
    event.srcElement.classList.add('active');
    if (type === 'color') {
      this.selectedColor = data;
      // const filter = this.listDetailVariety.filter((vari) => {
      //   vari.varietyAttributes.some(
      //     (att) => att.attributeId === this.selectedColor.attributeId
      //   );
      // });
      const varietiesWithAttribute = this.listDetailVariety.filter((variety) =>
        variety.varietyAttributes.some(
          (attribute) =>
            attribute.attributeId === this.selectedColor.attributeId
        )
      );
      console.log(varietiesWithAttribute);
    } else this.selectedSize = data;
    this.handleChangeAttribute();
  }

  handleChangeAttribute() {
    this.numberOfProduct = 0;
    this.selectedVariety = this.listDetailVariety.find((item) => {
      if (this.selectedSize && this.selectedColor)
        return (
          item[0].attributeId === this.selectedSize.attributeId &&
          item[1].attributeId === this.selectedColor.attributeId
        );
      else if (this.selectedSize && !this.selectedColor)
        return item[0].attributeId === this.selectedSize.attributeId;
      else if (!this.selectedSize && this.selectedColor)
        return item[1].attributeId === this.selectedColor.attributeId;
      return false;
    });
    this.attPrice = this.selectedVariety
      ? this.selectedVariety.price
      : this.product.price;
  }

  toggleActiveColor() {
    this.isActiveColor = !this.isActiveColor;
  }

  toggleActiveSize() {
    this.isActiveSize = !this.isActiveSize;
  }

  onChangeQty(event) {
    if (event.value > this.selectedVariety.stockAmount) {
      this.numberOfProduct = this.selectedVariety.stockAmount;
      this.isDisableBuy = true;
    } else {
      this.attPrice = this.selectedVariety.price * event.value;
      this.isDisableBuy = false;
    }
  }

  addToCart() {
    const data = {
      quantity: this.numberOfProduct,
      totalItemPrice: this.attPrice,
      varietyId: this.selectedVariety.varietyId,
    };
    if (this.isLogin) {
      this.cartService
        .addToCart(this.numberOfProduct, this.selectedVariety.varietyId)
        .subscribe({
          next: (res) =>
            this.messageSerice.add({
              key: 'toast',
              severity: 'success',
              detail: 'Added to cart',
            }),
        });
    } else {
      let localCart = this.storageService.getItemLocal('localCart');
      if (!localCart) {
        localCart = [];
      }
      localCart.push(data);
      this.storageService.setItemLocal('localCart', localCart);
    }
  }

  buyNow() {
    const data = {
      ...this.selectedVariety,
      quantity: this.numberOfProduct,
      image: this.product.images[0],
      name: this.product.name,
    };
    this.storageService.setItemLocal('cart', [data]);
    this.router.navigate(['/user/check-out']);
  }
}
