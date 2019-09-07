// Vendors
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Models
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    constructor(
        public http: HttpClient
    ) {

    }

    public products: Product[] = [
        {
            id: 1,
            title: 'Macbook Pro',
            price: 1300,
            inChart: false,
        },
        {
            id: 2,
            title: 'Iphone X',
            price: 800,
            inChart: false,
        },
        {
            id: 3,
            title: 'Samsung Tv',
            price: 2800,
            inChart: false,
        },
        {
            id: 4,
            title: 'Sony PS4',
            price: 500,
            inChart: false,
        }
    ];

    public getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${environment.apiUrl}/products/getAll`);
    }
}