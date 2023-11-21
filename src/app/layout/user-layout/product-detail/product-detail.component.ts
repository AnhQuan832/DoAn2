import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/core/service/cart.service';
import { ProductService } from 'src/app/core/service/product.service';
import { StorageService } from 'src/app/core/service/storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less'],
})
export class ProductDetailComponent implements OnInit {
  product;
  listImg;
  numberOfProduct = 1;
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
  constructor(
    private storageService: StorageService,
    private router: Router,
    private productSerivce: ProductService,
    private cartService: CartService,
    private messageSerice: MessageService
  ) { }
  ngOnInit(): void {
    this.initialize();
    setTimeout(() => {
      this.setDefaultAttribute();
    }, 1000);
  }

  initialize() {
    this.product = this.storageService.getItemLocal('currentProduct');
    this.listVarieties = this.product.varieties;
    this.productSerivce.getProductDetail(this.product.productId).subscribe({
      next: (res) => {
        this.product = res;
        this.product.varieties.forEach((item) => {
          this.listDetailVariety.push({ ...item, ...item.varietyAttributes });
        });
        this.product.varietyAttributeList.forEach((item) => {
          if (item.type === 'SIZE') this.listSize.push(item);
          else this.listColor.push(item);
        });
      },
    });
    this.cartService.getCart().subscribe({
      next: (res) => this.storageService.setItemLocal("cart", res)
    })
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
    if (type === 'color') this.selectedColor = data;
    else this.selectedSize = data;
    this.handleChangeAttribute();
  }

  handleChangeAttribute() {
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
    this.attPrice = this.selectedVariety ? this.selectedVariety.price : this.product.price;
  }

  toggleActiveColor() {
    this.isActiveColor = !this.isActiveColor;
  }

  toggleActiveSize() {
    this.isActiveSize = !this.isActiveSize;
  }

  onChangeQty(event) {
    this.attPrice = this.selectedVariety.price * event.value;
  }

  addToCart() {
    const cartId = this.storageService.getItemLocal("cart").cartId;
    const data = { quantity: this.numberOfProduct, totalItemPrice: this.attPrice, varietyId: this.selectedVariety.varietyId }
    this.cartService.addToCart(this.numberOfProduct, this.attPrice, this.selectedVariety.varietyId).subscribe({
      next: (res) => this.messageSerice.add({ key: 'toast', severity: 'success', detail: 'Added to cart' })
    })
  }
}
