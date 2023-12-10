import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { map, catchError } from 'rxjs';
import { API } from '../constants/enum';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getPaymentInfo() {
    return this.http
      .get(API.INVOICE.END_POINT.INVOICE_USER, {
        headers: this.storageService.getHttpHeader(),
      })
      .pipe(
        map((data: any) => {
          if (data.meta.statusCode === API.CART.STATUS.GET_PRODUCT_SUCCESS) {
            return data.data;
          } else {
            throw new Error(data.meta);
          }
        }),
        catchError((err) => {
          throw new Error(err);
        })
      );
  }

  processPayment(data) {
    return this.http
      .post(API.PAYMENT.END_POINT.CHECK_OUT, data, {
        headers: this.storageService.getHttpHeader(),
      })
      .pipe(
        map((data: any) => {
          if (data.meta.statusCode === API.CART.STATUS.GET_PRODUCT_SUCCESS) {
            return data.data.output;
          } else {
            throw new Error(data.meta);
          }
        }),
        catchError((err) => {
          throw new Error(err);
        })
      );
  }
  getVoucher() {
    return this.http
      .get(API.VOUCHER.END_POINT.AVAILABLE_VOUCHER, {
        headers: this.storageService.getHttpHeader(),
      })
      .pipe(
        map((data: any) => {
          if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
            return data.data.voucherList;
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
