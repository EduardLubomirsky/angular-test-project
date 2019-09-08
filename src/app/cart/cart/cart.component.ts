import { Component } from '@angular/core';
import { User, Cart } from 'src/app/shared/models';
import { AuthenticationService, CartService } from 'src/app/shared/services';
import { CartResponse } from 'src/app/shared/models/cart-response.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  public columns: string[] = ['title', 'price', 'remove'];

  public currentUser: User;
  public cartItems: CartResponse[] = [];
  public totalPrice: number;
  public loading: boolean = true;

  constructor(
    public authenticationService: AuthenticationService,
    public cartService: CartService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.getCartByUserId(this.currentUser.id);
  }


  public getCartByUserId(id: number) {
    this.cartService.getCartByUserId(id).subscribe((res) => {
      this.loading = false;
      this.cartItems = res;
      this.cartService.dataSource.next(this.cartItems);
      this.totalPrice = this.getTotalPrice();
    });
  }

  public getTotalPrice(): number {
    return this.cartItems.reduce((buff, x) => {
      return buff += x.productItem.price;
    }, 0);
  }

  public removeFromCart(userId, productId) {
    this.cartService.removeFromCart(userId, productId).subscribe((res) => {
      const index = this.cartItems.findIndex((x) => x.productItem.id === res[0].productId);
      this.cartItems.splice(index, 1);
      this.cartService.dataSource.next(this.cartItems);
      this.totalPrice = this.getTotalPrice();
    })
  }

  public clearAllCart(userId) {
    this.cartService.clearAll(userId).subscribe((res) => {
      this.cartItems = [];
      this.cartService.dataSource.next(this.cartItems);
      this.totalPrice = this.getTotalPrice();
    });
  }
}
