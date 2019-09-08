// Vendors
import { Component, OnInit, OnDestroy } from '@angular/core';

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

  public addToCart(product: Product) {
    if(product.inCart) {
      this.router.navigate(['cart']);
    } else {
      product.inCart = true;
    }
  }
}
