// Vendors
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// Services
import { StoreService } from '../services'
import { Chart } from '../models';

let users = JSON.parse(localStorage.getItem('users')) || [];
let chart: Chart[] = JSON.parse(localStorage.getItem('chart')) || [];


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor(
        public storeService: StoreService
    ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        const handleRoute = () => {

            const getAllProducts = () => {
                // if product exist in chart set inChart as true
                this.storeService.products.map((x) => {
                    chart.map((y) => {
                        if (x.id === y.productId) {
                            x.inChart = true;
                        }
                    });
                });
                return ok(this.storeService.products);
            }

            const getChartItem = () => {
                
            } 

            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.endsWith('/products/getAll') && method === 'GET':
                    return getAllProducts();
                case url.endsWith('/chart/addNew') && method === 'POST':
                    return addNewItemToChart();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                default:
                    return next.handle(request);
            }
        }

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function authenticate() {
            const { email, password } = body;
            const user = users.find(x => x.email === email && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body
            if (users.find(x => x.email === user.email)) {
                return error('Username "' + user.email + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        // const getChartItems = (userId) => {
        //     const chartForUser = chart.find(x => x.userId === userId);
        // }

        function addNewItemToChart() {
            const { user, product } = body;
            chart.push({
                productId: product.id,
                userId: user.id
            });
            localStorage.setItem('chart', JSON.stringify(chart));
            return ok(product);
        }
    }
}

export const FakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};