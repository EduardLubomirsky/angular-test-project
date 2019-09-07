// Vendors
import { Component, OnInit } from '@angular/core';

// Models
import { Product } from '../../shared/models'
import { StoreService } from 'src/app/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {

  public products: Product[];

  constructor(
    public storeService: StoreService,
    public router: Router
  ) {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.storeService.getAllProducts().subscribe((res) => {
      this.products = res;
    });
  }

  public addToChart(product: Product) {
    if(product.inChart) {
      this.router.navigate(['chart']);
    } else {
      product.inChart = true;
      // add to chart
    }
  }

}
