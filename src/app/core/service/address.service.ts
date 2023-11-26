import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private baseUrl =
    'https://online-gateway.ghn.vn/shiip/public-api/master-data/';

  private token = '12a3810e-8ba7-11ee-a59f-a260851ba65c';
  private shop_id = '4723073';
  private service_id = 53321;
  private from_district_id = 1442;
  constructor(private http: HttpClient) {}

  getProvinces(): Observable<any> {
    return this.http.get(this.baseUrl + 'province', {
      headers: { token: this.token },
    });
  }

  getDisctrictsByProvince(provinceCode: string): Observable<any> {
    return this.http.get(this.baseUrl + `district`, {
      params: { province_id: provinceCode },
      headers: { token: this.token },
    });
  }

  getWardsByDistrict(districtCode: string): Observable<any> {
    return this.http.get(this.baseUrl + `ward`, {
      params: { district_id: districtCode },
      headers: { token: this.token },
    });
  }

  getShippingService(district_id) {
    const params = {
      shop_id: this.shop_id,
      from_district: this.from_district_id,
      to_district: district_id,
    };
    return lastValueFrom(
      this.http.get(
        'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services',
        {
          headers: { token: this.token },
          params,
        }
      )
    );
  }

  getShippingFee(data) {
    const params = {
      ...data,
      from_district_id: this.from_district_id,
    };
    return this.http.post(
      'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
      params,
      {
        headers: { token: this.token, shop_id: this.shop_id },
      }
    );
  }
}
