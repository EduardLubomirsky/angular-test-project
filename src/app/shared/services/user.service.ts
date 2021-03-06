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

    public getUserByEmail(email: string) {
        return this.http.post(`${environment.apiUrl}/users/getUserByEmail`, { email });
    }

    public register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    public resetPassword(email: string, password: string) {
        return this.http.post(`${environment.apiUrl}/users/resetPassword`, { email, password })
    }
}