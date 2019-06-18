import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppSettings} from '../config';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${AppSettings.apiUrl}/Clients`);
    }

    register(user) {
        return this.http.post(`${AppSettings.apiUrl}/Clients`, user);
    }

    delete(id) {
        return this.http.delete(`${AppSettings.apiUrl}/Clients/${id}`);
    }
}