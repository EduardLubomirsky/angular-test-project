// Vendors
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product, User } from 'src/app/shared/models';
import { Router } from '@angular/router';

// Services
import { CartService, AuthenticationService } from 'src/app/shared/services';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input('product') product: Product;
  @Output('onAddToCart') onAddToCart: EventEmitter<Product> = new EventEmitter();
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
        this.onAddToCart.emit(this.product);
      });
    }
  }
}
