// Vendors
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Models
import { Product, User } from '../models';

@Injectable({
    providedIn: 'root'
})
export class ChartService {
    constructor(
        public http: HttpClient
    ) {

    }

    public addToChart(product: Product, user: User): Observable<Product> {
        return this.http.post<Product>(`${environment.apiUrl}/chart/addNew`, { product, user });
    }
}