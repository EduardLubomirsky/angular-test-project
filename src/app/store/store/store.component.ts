// Vendors
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { Product, Cart } from '../../shared/models'

// Services
import { StoreService, CartService, AuthenticationService } from 'src/app/shared/services';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  public products: Product[];

  constructor(
    public storeService: StoreService,
    public cartService: CartService,
    public authService: AuthenticationService,
    public router: Router
  ) {
    this.getAllProducts();
    const currentId = this.authService.currentUserValue.id;
    let cart: Cart[] = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(x => x.userId === currentId);
    this.cartService.dataSource.next(cart);
  }

  public getAllProducts() {
    this.storeService.getAllProducts().subscribe((res) => {
      this.products = res;
    });
  }

  public addToCart(product: Product) {
    if (product.inCart) {
      this.router.navigate(['cart']);
    } else {
      product.inCart = true;
    }
  }

  public onAddToCart(e) {
    const cartElements = this.cartService.dataSource.getValue().concat([e]);
    this.cartService.dataSource.next(cartElements);
  }
}
