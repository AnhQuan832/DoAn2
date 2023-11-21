import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../constants/enum';
import { catchError, map } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private storageService: StorageService) { }


  getCart() {
    return this.http.get(API.CART.END_POINT.CART, { headers: this.storageService.getHttpHeader() }).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.CART.STATUS.GET_PRODUCT_SUCCESS) {
          return data.data.cart
        }
        else {
          throw new Error(data.meta)
        }
      }),
      catchError((err) => {
        throw new Error(err)
      })
    );
  }

  addToCart(quantity, totalItemPrice, varietyId) {
    return this.http.post(API.CART.END_POINT.ADD_TO_CART, { quantity, totalItemPrice, varietyId }, { headers: this.storageService.getHttpHeader() }).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.CART.STATUS.GET_PRODUCT_SUCCESS) {
          return data.data.cart
        }
        else {
          throw new Error(data.meta)
        }
      }),
      catchError((err) => {
        throw new Error(err)
      })
    );
  }
}
