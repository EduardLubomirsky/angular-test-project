import { Component, OnInit, Input } from '@angular/core';
import { Product, User } from 'src/app/shared/models';
import { ChartService, AuthenticationService } from 'src/app/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input('product') product: Product;
  public currentUser: User;

  constructor(
    public chartService: ChartService,
    public authenticationService: AuthenticationService,
    public router: Router
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  public addToChart() {
    if (this.product.inChart) {
      this.router.navigate(['chart']);
    } else {
      this.chartService.addToChart(this.product, this.currentUser).subscribe(res => {
        this.product.inChart = true;
      });
    }
  }
}
