import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../constants/enum';
import { catchError, map } from 'rxjs';
import { StorageService } from './storage.service';
import { AddressService } from './address.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private shippingService: AddressService
  ) {}

  getCart() {
    return this.http
      .get(API.CART.END_POINT.CART, {
        headers: this.storageService.getHttpHeader(),
      })
      .pipe(
        map((data: any) => {
          if (data.meta.statusCode === API.CART.STATUS.GET_PRODUCT_SUCCESS) {
            return data.data.cartItems;
          } else {
            throw new Error(data.meta);
          }
        }),
        catchError((err) => {
          throw new Error(err);
        })
      );
  }

  getUnauthCart() {
    return this.http.get(API.CART.END_POINT.GET_UNAUTH_CART).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.CART.STATUS.GET_PRODUCT_SUCCESS) {
          return data.data.cartItems;
        } else {
          throw new Error(data.meta);
        }
      }),
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  addToCart(quantity, varietyId, totalItemPrice?) {
    return this.http
      .post(
        API.CART.END_POINT.ADD_TO_CART,
        { quantity, totalItemPrice, varietyId },
        { headers: this.storageService.getHttpHeader() }
      )
      .pipe(
        map((data: any) => {
          if (data.meta.statusCode === API.CART.STATUS.GET_PRODUCT_SUCCESS) {
            return true;
          } else {
            throw new Error(data.meta);
          }
        }),
        catchError((err) => {
          throw new Error(err);
        })
      );
  }

  selectItem(itemId) {
    return this.http
      .post(API.CART.END_POINT.SELECT_CART_ITEM + `/${itemId}`, null, {
        headers: this.storageService.getHttpHeader(),
      })
      .pipe(
        map((data: any) => {
          if (data.meta.statusCode === API.CART.STATUS.GET_PRODUCT_SUCCESS) {
            return true;
          } else {
            throw new Error(data.meta);
          }
        }),
        catchError((err) => {
          throw new Error(err);
        })
      );
  }

  getShippingFee(data) {
    return this.shippingService.getShippingFee(data);
  }
}
