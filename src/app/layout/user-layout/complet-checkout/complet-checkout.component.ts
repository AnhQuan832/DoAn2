import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/service/storage.service';

@Component({
  selector: 'app-complet-checkout',
  templateUrl: './complet-checkout.component.html',
  styleUrls: ['./complet-checkout.component.less'],
})
export class CompletCheckoutComponent implements OnInit {
  constructor(
    private location: Location,
    private invoiceService: InvoiceService,
    private router: Router,
    private storageSerivce: StorageService
  ) {}

  ngOnInit(): void {
    const invoiceId = this.storageSerivce.getItemLocal('sucInvoice');
    const isLogin = this.storageSerivce.getItemLocal('userInfo');
    const params = {
      status: 'PAID',
      invoiceId: invoiceId,
    };
    this.invoiceService.updateStatus(params).subscribe({
      next: (res) => {
        setTimeout(() => {
          if (isLogin) this.router.navigate(['/user/profile']);
          else this.router.navigate(['/user/home']);
        }, 300);
      },
    });
  }
}
