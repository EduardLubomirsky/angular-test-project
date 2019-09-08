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

    public getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${environment.apiUrl}/products/getAll`);
    }
}