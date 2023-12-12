import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less'],
})
export class NavBarComponent {
  isLoggin = true;
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
        this.router.navigate(['/auth/login']);
      },
    },
  ];

  constructor(
    private router: Router,
    private socialLoginService: SocialAuthService
  ) {}

  routeToCart() {
    this.socialLoginService.signOut();
    this.router.navigate(['/user/cart']);
  }
}
