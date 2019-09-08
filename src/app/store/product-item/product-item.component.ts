import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product, User } from 'src/app/shared/models';
import { CartService, AuthenticationService } from 'src/app/shared/services';
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
    public cartService: CartService,
    public authenticationService: AuthenticationService,
    public router: Router
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  public addToCart() {
    if (this.product.inCart) {
      this.router.navigate(['cart']);
    } else {
      this.cartService.addToCart(this.product, this.currentUser).subscribe(res => {
        this.product.inCart = true;
        this.cartService.dataSource.next(this.cartService.dataSource.getValue().concat([this.product]));

      });
    }
  }
}
