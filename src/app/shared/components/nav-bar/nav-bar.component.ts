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
      label: 'New',
      icon: 'pi pi-user',
    },
    {
      label: 'Log out',
      icon: 'pi pi-sign-out',
      command: () => {
        this.router.navigate(['/auth/login']);
      },
    },
  ];

  constructor(private router: Router) {}

  routeToCart() {
    this.router.navigate(['/user/cart']);
  }
}
