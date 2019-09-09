// Vendors
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Models
import { Product, User, Cart, CartResponse } from '../models';

// Service
import { AuthenticationService } from './authentification.service';

@Injectable({
    providedIn: 'root'
})

export class CartService {
    public dataSource = new BehaviorSubject([]);

    constructor(
        public http: HttpClient,
        public authService: AuthenticationService
    ) {

    }

    public addToCart(product: Product, user: User): Observable<Product> {
        return this.http.post<Product>(`${environment.apiUrl}/cart/addNew`, { product, user });
    }

    public getCartByUserId(id: number): Observable<CartResponse[]> {
        return this.http.get<CartResponse[]>(`${environment.apiUrl}/cart/getCartProducts/${id}`);
    }

    public removeFromCart(userId: number, productId: number): Observable<Cart> {
        return this.http.post<Cart>(`${environment.apiUrl}/cart/removeFromCart`, {
            userId,
            productId
        })
    }

    public clearAll(id: number): Observable<CartResponse[]> {
        return this.http.get<CartResponse[]>(`${environment.apiUrl}/cart/clearAll/${id}`);
    }

    public getCartCount(id: number): Observable<number> {
        return this.http.get<number>(`${environment.apiUrl}/cart/getCartCount/${id}`);
    }
}