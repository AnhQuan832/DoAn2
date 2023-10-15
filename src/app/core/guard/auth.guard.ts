import { Injectable, Type, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router, private storageService: StorageService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.storageService.getDataFromCookie("jwtToken") !== null) {
      const role = route.data["userRoles"] as Array<string>;
      if (role) {
        const match = this.authService.roleMatch(role);
        if (match) {
          return true;
        }
        else {
          this.router.navigate(['/user/home'])
          return false;
        }
      }
    }
    this.router.navigate(['/auth/login'])
    return false
  }


}
