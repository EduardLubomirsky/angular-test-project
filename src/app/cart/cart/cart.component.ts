// Vendors
import { Component } from '@angular/core';

// Models
import { User, CartResponse } from 'src/app/shared/models';

// Services
import { AuthenticationService, CartService } from 'src/app/shared/services';

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

  public removeFromCart(userId: number, productId: number) {
    this.cartService.removeFromCart(userId, productId).subscribe((res) => {
      const index = this.cartItems.findIndex((x) => x.productItem.id === res[0].productId);
      this.cartItems.splice(index, 1);
      this.cartService.dataSource.next(this.cartItems);
      this.totalPrice = this.getTotalPrice();
    })
  }

  public clearAllCart(userId: number) {
    this.cartService.clearAll(userId).subscribe((res) => {
      this.cartItems = [];
      this.cartService.dataSource.next(this.cartItems);
      this.totalPrice = this.getTotalPrice();
    });
  }
}
