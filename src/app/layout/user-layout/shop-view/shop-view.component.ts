import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/service/product.service';
import { DataView } from 'primeng/dataview';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.less'],
})
export class ShopViewComponent implements OnInit {
  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  products;
  searchValue;
  timeAutoPlay = 3000;
  protected selectedShelter = 'All';
  protected selectedSpecie = 'All';

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.initialize();
  }

  private initialize() {
    this.productService.getAllProduct().subscribe({
      next: (res) => {
        this.products = res;
        console.log(this.products);
      },
      error: (err) => console.log(err),
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'success';
    }
  }

  onUserSearched() {}

  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value, 'contains');
  }
}
