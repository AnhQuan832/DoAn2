import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/core/service/address.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.less']
})
export class CheckOutComponent implements OnInit {
  listProvince: any[] = []
  listDistrict: any[] = []
  listWard: any[] = []

  constructor(private apiAddress: AddressService) { }
  ngOnInit(): void {
    this.bindProvinces();
  }


  bindProvinces() {
    this.apiAddress.getProvinces().subscribe(response => {
      const rListProvince = response.data.data
      this.listProvince = rListProvince.map(rListProvince => {
        return {
          provName: rListProvince.name_with_type,
          provCode: rListProvince.code
        }
      })
      console.log(this.listProvince)
    }),
      err => {
        console.log(err.error.message)
      }
  }

  provinceSelectedChange(selectedValue) {
    let foundProvince = this.listProvince.find(item => item.provName == selectedValue.provName);
    this.apiAddress.getDisctrictsByProvince(foundProvince.provCode).subscribe(response => {
      const rListDistrict = response.data.data
      this.listDistrict = rListDistrict.map(rListDistrict => {
        return {
          distName: rListDistrict.name_with_type,
          distCode: rListDistrict.code
        }
      }),
        err => {
          console.log(err.error.message)
        }
    }),
      err => {
        console.log(err.error.message)
      }
  }

  districtSelectedChange(selectedValue) {
    this.apiAddress.getWardsByDistrict(selectedValue.distCode).subscribe(response => {
      const rListWard = response.data.data
      this.listWard = rListWard.map(rListWard => {
        return {
          wardName: rListWard.name_with_type,
          wardCode: rListWard.code
        }
      })
    }),
      err => {
        console.log(err.error.message)
      }
  }
}
