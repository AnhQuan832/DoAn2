import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  isLoading: boolean = true;
  protected genderOptions = [
    {
      id: 'FEMALE',
      value: 'Nữ',
    },
    {
      id: 'MALE',
      value: 'Nam',
    },
    {
      id: 'OTHER',
      value: 'Khác',
    },
  ];
  protected avatarFile: FileList;
  listTransactions;
  formGroup: FormGroup;
  cart;
  cartId;
  selectedProducts: any[] = [];
  isLogin: boolean = false;
  originalData: any;
  constructor(
    private formBuilder: FormBuilder,
    private userSerivce: UserService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      userEmail: [null, Validators.required],
      userFirstName: [null, Validators.required],
      userLastName: [null, Validators.required],
      userPhoneNumber: [null],
      memberPoint: [null, Validators.required],
      userAvatar: [null, Validators.required],
      addressList: this.formBuilder.group({}),
    });

    this.getData();
  }

  selectedAvatar(event) {
    this.avatarFile = event.target.files;
    const imgInput = <HTMLImageElement>document.getElementById('imgInput');
    imgInput.src = URL.createObjectURL(this.avatarFile[0]);
  }

  updateUserProfile() {}
  getData() {
    this.isLoading = true;
    forkJoin([
      this.userSerivce.getProfile(),
      this.invoiceService.getPaymentInfo(),
    ]).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.formGroup.patchValue(res[0]);
        this.listTransactions = res[1];
      },
    });
  }

  onRowSelect(row) {
    console.log(row);
    this.invoiceService.getPaymentDetail(row.invoiceId).subscribe({
      next: (res) => {
        this.cart = res;
      },
    });
  }
}
