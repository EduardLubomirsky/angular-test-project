// Vendors
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Models
import { User } from '../models';

// Environment
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    public getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    public register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    public delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}