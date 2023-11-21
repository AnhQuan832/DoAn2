import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API } from '../constants/enum';
import { catchError, map } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  getAllProduct() {
    return this.httpClient.get(API.PRODUCT.END_POINT.PRODUCT).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return data.data.productList
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

  getProductDetail(id) {
    return this.httpClient.get(API.PRODUCT.END_POINT.PRODUCT + `/${id}`).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return data.data.product
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
