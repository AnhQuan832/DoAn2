import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API } from '../constants/enum';
import { catchError, map } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  getAllProduct() {
    return this.httpClient.get(API.PRODUCT.END_POINT.PRODUCT).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return data.data.productList;
        } else {
          throw new Error(data.meta);
        }
      }),
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  getProductDetail(id) {
    return this.httpClient.get(API.PRODUCT.END_POINT.PRODUCT + `/${id}`).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return data.data.product;
        } else {
          throw new Error(data.meta);
        }
      }),
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  addReview(data) {
    return this.httpClient
      .post(API.PRODUCT.END_POINT.REVIEW, data, {
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

  globalSearch(keyword) {
    return this.httpClient
      .get(API.SEARCH.ENDPOINT, { params: { keyword: keyword } })
      .pipe(
        map((data: any) => {
          if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
            return data.data.searchResult;
          } else {
            return [];
          }
        }),
        catchError((err) => {
          throw new Error(err);
        })
      );
  }
  getBrand() {
    return this.httpClient.get(API.PRODUCT.END_POINT.BRAND).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return data.data.brandList;
        } else {
          return [];
        }
      }),
      catchError((err) => {
        throw new Error(err);
      })
    );
  }
  getCategory() {
    return this.httpClient.get(API.PRODUCT.END_POINT.CATEGORY).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return data.data.categoryList;
        } else {
          return [];
        }
      }),
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  getProdMost(quantity) {
    return this.httpClient
      .get(API.PRODUCT.END_POINT.MOST_VIEW, { params: { quantity } })
      .pipe(
        map((data: any) => {
          if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
            return data.data.productList;
          } else {
            return [];
          }
        }),
        catchError((err) => {
          throw new Error(err);
        })
      );
  }

  getProdMostBuy(params) {
    return this.httpClient
      .get(API.PRODUCT.END_POINT.MOST_BUY, { params: params })
      .pipe(
        map((data: any) => {
          if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
            return data.data.productList;
          } else {
            return [];
          }
        }),
        catchError((err) => {
          throw new Error(err);
        })
      );
  }
}
