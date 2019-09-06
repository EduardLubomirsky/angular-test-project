// Vendors
import { Component, OnInit } from '@angular/core';

// Models
import { Product } from '../../shared/models'
import { StoreService } from 'src/app/shared/services';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  public products: Product[];

  constructor(
    public storeService: StoreService
  ) {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.storeService.getAllProducts().subscribe((res) => {
      console.log(res);
    });
  }


  ngOnInit() {

  }

}
