import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { debounce } from 'rxjs';
import { ProductService } from 'src/app/core/service/product.service';
import { StorageService } from 'src/app/core/service/storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less'],
})
export class NavBarComponent implements OnInit, AfterViewInit {
  isLoggin;
  keySearch;
  searchRes;
  isShowSearch = true;
  showSearchRes = false;
  items: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => {
        this.router.navigate(['/user/profile']);
      },
    },
    // {
    //   label: 'Shopping history',
    //   icon: 'pi pi-shopping-bag',
    //   command: () => {
    //     this.router.navigate(['/user/invoice-history']);
    //   },
    // },
    {
      label: 'Log out',
      icon: 'pi pi-sign-out',
      command: () => {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
      },
    },
  ];

  constructor(
    private router: Router,
    private socialLoginService: SocialAuthService,
    private productSerivce: ProductService,
    private storageService: StorageService,
    private location: Location
  ) {}
  ngOnInit(): void {
    const info = this.storageService.getItemLocal('userInfo');
    this.isLoggin = info.userId ? true : false;
  }
  ngAfterViewInit(): void {
    this.setActiveNavItem();
  }

  routeToCart() {
    this.socialLoginService.signOut();
    this.router.navigate(['/user/cart']);
  }

  onSearch(key) {
    this.showSearchRes = true;
    if (!key) this.showSearchRes = false;

    this.productSerivce.globalSearch(this.keySearch).subscribe({
      next: (res) => {
        // this.searchRes = Object.keys(res);
        // this.searchRes = Object.keys(res).reduce((acc, key) => {
        //   return acc.concat(res[key]);
        // }, []);
        this.searchRes = Object.values(res).map((items: any) => {
          const groupItemName = items[0]?.groupName;
          const groupItemId = groupItemName?.toLowerCase();

          const groupItems = items.map((item) => ({
            itemName: item.itemName,
            itemId: item.itemId,
            image: item.itemImage,
            group: item.groupName,
          }));

          return {
            itemName: groupItemName || '',
            itemId: groupItemId || '',
            items: groupItems,
          };
        });
      },
    });
  }
  hideSearchBar() {
    this.isShowSearch = false;
  }

  routeToProduct(product) {
    this.showSearchRes = false;
    const prod = { ...product, productId: product.itemId };
    this.storageService.setItemLocal('currentProduct', prod);
    this.router.navigate([`user/product-detail/${prod.productId}`]);
  }

  setActiveNavItem() {
    let path = this.location.path();
    if (path.includes('home')) this.setActiveNavitem('home');
    else if (path.includes('shop')) this.setActiveNavitem('product');
    else if (path.includes('message')) this.setActiveNavitem('message');
  }

  public setActiveNavitem(element: any) {
    const items = document.querySelectorAll('.nav-link');
    const actived = document.getElementById(element) as HTMLElement;
    items.forEach((item) => {
      item.classList.remove('active');
      item.removeAttribute('style');
    });

    actived.classList.add('active');
  }

  toLoginPage() {
    this.router.navigate(['/auth/login']);
  }
}
