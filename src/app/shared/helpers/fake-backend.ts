// Vendors
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// Services
import { StoreService } from '../services'

// Models
import { Cart, Product, CartResponse } from '../models';

let users = JSON.parse(localStorage.getItem('users')) || [];


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    public products: Product[] = [
        {
            id: 1,
            title: 'Macbook Pro',
            price: 1300,
            inCart: false,
        },
        {
            id: 2,
            title: 'Iphone X',
            price: 800,
            inCart: false,
        },
        {
            id: 3,
            title: 'Samsung Tv',
            price: 2800,
            inCart: false,
        },
        {
            id: 4,
            title: 'Sony PS4',
            price: 500,
            inCart: false,
        },
        {
            id: 5,
            title: 'Samsung Galaxy',
            price: 600,
            inCart: false,
        }
    ];
    constructor(
        public storeService: StoreService
    ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        const handleRoute = () => {

            const getAllProducts = () => {
                const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
                const cart: Cart[] = JSON.parse(localStorage.getItem('cart')) || [];
                // if product exist in cart set inCart as true
                this.products.map((x) => {
                    x.inCart = false;
                    cart.map((y) => {
                        if (x.id === y.productId && y.userId === currentUser.id) {
                            x.inCart = true;
                        }
                    });
                });
                return ok(this.products);
            }

            const getCartItems = () => {
                const cart: Cart[] = JSON.parse(localStorage.getItem('cart')) || [];
                const userId = +this.getIdFromUrl(url);
                let cartItems: Cart[] = cart.filter(c => {
                    if (c.userId === userId) {
                        return c
                    };
                });
                const cartResponse: CartResponse[] = cartItems.map((x) => {
                    return {
                        cartItem: x,
                        productItem: this.products.find(p => p.id === x.productId)
                    }
                })
                return ok(cartResponse);
            }

            const removeFromCart = () => {
                const cart: Cart[] = JSON.parse(localStorage.getItem('cart')) || [];
                const { userId, productId } = body;
                const index = cart.findIndex((x) => {
                    if (x.productId === productId && userId === x.userId) {
                        return true;
                    }
                })
                const removedItem = cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                return ok(removedItem);
            }

            const getCartCount = () => {
                const cart: Cart[] = JSON.parse(localStorage.getItem('cart')) || [];
                const userId = +this.getIdFromUrl(url)
                const filteredCart = cart.filter(x => x.userId === userId);
                return ok(filteredCart.length);
            }

            const clearAll = () => {
                const cart: Cart[] = JSON.parse(localStorage.getItem('cart')) || [];
                const userId = +this.getIdFromUrl(url)
                let i = cart.length;
                while (i--) {
                    const index = cart.findIndex(c => cart[i].userId === userId);
                    if (index !== -1) {
                        cart.splice(index, 1);
                    }
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                return ok(cart);
            }

            const getUserByEmail = () => {
                const { email } = body;
                const result = users.find(x => x.email === email);
                return ok(result);
            }

            const resetPassword = () => {
                const { email, password } = body;
                users.map((x) => {
                    if (x.email === email) {
                        x.password = password;
                    }
                });
                localStorage.setItem('users', JSON.stringify(users));
                const result = users.find(x => x.email === email);
                return ok(result);
            }
            const authenticate = () => {
                const { email, password } = body;
                const user = users.find(x => x.email === email && x.password === password);
                if (!user) return error('Email or password is incorrect');
                return ok({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    token: 'fake-jwt-token'
                })
            }
    
            const register = () => {
                const user = body
                if (users.find(x => x.email === user.email)) {
                    return error('Email "' + user.email + '" is already taken')
                }
                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
    
                return ok();
            }
    
            const ok = (body?) => {
                return of(new HttpResponse({ status: 200, body }))
            }
    
            const error = (message) => {
                return throwError({ error: { message } });
            }
    
            const addNewItemToCart = () => {
                const cart: Cart[] = JSON.parse(localStorage.getItem('cart')) || [];
                const { user, product } = body;
                cart.push({
                    productId: product.id,
                    userId: user.id,
                });
                localStorage.setItem('cart', JSON.stringify(cart));
                return ok(product);
            }
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users/getUserByEmail') && method === 'POST':
                    return getUserByEmail();
                case url.endsWith('/users/resetPassword') && method === 'POST':
                    return resetPassword();
                case url.includes('/cart/getCartProducts') && method === 'GET':
                    return getCartItems();
                case url.endsWith('/cart/addNew') && method === 'POST':
                    return addNewItemToCart();
                case url.includes('/cart/getCartCount') && method === 'GET':
                    return getCartCount();
                case url.endsWith('/cart/removeFromCart') && method === 'POST':
                    return removeFromCart();
                case url.includes('/cart/clearAll') && method === 'GET':
                    return clearAll();
                case url.endsWith('/products/getAll') && method === 'GET':
                    return getAllProducts();
                default:
                    return next.handle(request);
            }
        }

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }

    private getIdFromUrl(url: string): string {
        return url.substring(url.lastIndexOf('/') + 1);
    }
}

export const FakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};