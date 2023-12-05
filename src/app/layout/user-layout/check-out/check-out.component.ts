import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/core/service/address.service';
import { CartService } from 'src/app/core/service/cart.service';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { StorageService } from 'src/app/core/service/storage.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.less'],
})
export class CheckOutComponent implements OnInit {
  shipService = [
    {
      service_type_id: 2,
      name: 'E-comerce shipping',
      price: 0,
    },
    {
      service_type_id: 5,
      name: 'Traditional shipping',
      price: 0,
    },
  ];

  paymentType = ['CREDIT_CARD'];
  listProvince: any[] = [];
  listDistrict: any[] = [];
  listWard: any[] = [];
  listShippingService: any[] = [];
  selectedProvince: any;
  selectedDistrict: any;
  selectedWard: any;
  selectedShipping: any;
  cartItem;
  totalPrice;
  isAddNewAddress: boolean = false;
  listAddress: any[] = [];
  selectedAdd: any;
  checkOutForm: FormGroup;
  constructor(
    private apiAddress: AddressService,
    private cartService: CartService,
    private storageSerive: StorageService,
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.bindProvinces();
    this.cartItem = this.storageSerive.getItemLocal('cart');
    this.totalPrice = this.cartItem.reduce((acc, currentItem) => {
      return acc + currentItem.totalItemPrice;
    }, 0);
    this.getListAddress();
    this.checkOutForm = this.fb.group({
      recipientName: this.fb.control('', [Validators.required]),
      phoneNumber: this.fb.control('', [Validators.required]),
      paymentType: this.fb.control(''),
      returnUrl: this.fb.control(''),
      address: this.fb.group({
        userId: this.fb.control(''),
        addressId: this.fb.control(''),
        streetName: this.fb.control('', [Validators.required]),
        cityName: this.fb.control('', [Validators.required]),
        districtName: this.fb.control('', [Validators.required]),
        wardName: this.fb.control('', [Validators.required]),
      }),
    });
  }

  getListAddress() {
    this.apiAddress.getAddress().subscribe({
      next: (res) => {
        this.listAddress = res;
      },
    });
  }

  bindProvinces() {
    this.apiAddress.getProvinces().subscribe((response) => {
      const rListProvince = response.data;
      this.listProvince = rListProvince.map((rListProvince) => {
        return {
          provName: rListProvince.ProvinceName,
          provCode: rListProvince.ProvinceID,
        };
      });
    }),
      (err) => {
        console.log(err.error.message);
      };
  }

  provinceSelectedChange(selectedValue) {
    // this.checkOutForm.patchValue({ city: selectedValue.provName });
    let foundProvince = this.listProvince.find(
      (item) => item.provName == selectedValue.provName
    );
    this.apiAddress
      .getDisctrictsByProvince(foundProvince.provCode)
      .subscribe((response) => {
        const rListDistrict = response.data;
        (this.listDistrict = rListDistrict.map((rListDistrict) => {
          return {
            distName: rListDistrict.DistrictName,
            distCode: rListDistrict.DistrictID,
          };
        })),
          (err) => {
            console.log(err.error.message);
          };
      }),
      (err) => {
        console.log(err.error.message);
      };
  }

  districtSelectedChange(selectedValue) {
    // this.checkOutForm.patchValue({ district: selectedValue.distName });

    this.apiAddress
      .getWardsByDistrict(selectedValue.distCode)
      .subscribe((response) => {
        const rListWard = response.data;
        this.listWard = rListWard.map((rListWard) => {
          return {
            wardName: rListWard.WardName,
            wardCode: rListWard.WardCode,
          };
        });
      }),
      (err) => {
        console.log(err.error.message);
      };
  }

  async wardSelectChange(selectedValue) {
    // this.checkOutForm.patchValue({ ward: selectedValue.wardName });

    await this.apiAddress
      .getShippingService(this.selectedDistrict.distCode)
      .then((res: any) => {
        this.listShippingService = res.data;
      });
    this.listShippingService.forEach((item, index) => {
      const data = {
        to_district_id: this.selectedDistrict.distCode,
        to_ward_code: this.selectedWard.wardCode,
        insurance_value: 500000,
        service_id: item.service_id,
        height: 15,
        length: 15,
        weight: 1000,
        width: 15,
        coupon: null,
      };
      this.cartService.getShippingFee(data).subscribe((res: any) => {
        if (res.code === 200)
          this.shipService.map((item) => {
            if (
              item.service_type_id ===
              this.listShippingService[index].service_type_id
            )
              item.price = res.data.total;
          });
        console.log(this.shipService);
      });
    });
  }

  shippingServiceChange(selectedValue) {}

  onCheckOut() {
    this.checkOutForm.patchValue({ address: this.selectedAdd });
    this.checkOutForm.patchValue({ paymentType: 'CREDIT_CARD' });
    this.checkOutForm.patchValue({
      returnUrl: 'http://localhost:4200/user/cart',
    });

    this.invoiceService.processPayment(this.checkOutForm.value).subscribe({
      next: (res) => {
        console.log(res);
        window.open(res);
      },
    });
  }

  onAddress() {
    if (this.isAddNewAddress) {
      const address = {
        userId: this.storageSerive.getItemLocal('userInfo')?.userId,
        streetName: this.checkOutForm.value.address.streetName,
        cityName: this.selectedProvince.provName,
        districtName: this.selectedDistrict.distName,
        wardName: this.selectedWard.wardName,
      };
      this.apiAddress.addAddress(address).subscribe({
        next: (res) => {
          this.listAddress.push(res);
        },
      });
    } else {
      this.isAddNewAddress = !this.isAddNewAddress;
    }
  }
}
