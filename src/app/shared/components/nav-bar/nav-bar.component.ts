import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent {
  isLoggin = true;

  constructor(private router: Router) { }

  routeToCart() {
    this.router.navigate(['/user/cart'])
  }
}
