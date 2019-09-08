import { Cart } from './cart.model';
import { Product } from './product.model';

export class CartResponse {
    cartItem: Cart;
    productItem: Product;
}