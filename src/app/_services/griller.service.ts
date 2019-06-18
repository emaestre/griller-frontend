import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppSettings} from '../config';

@Injectable({ providedIn: 'root' })
export class GrillerService {
    constructor(private http: HttpClient) { }
    create(griller) {
        return this.http.post(`${AppSettings.apiUrl}/Grills`, griller);
    }

    getAll() {
        return this.http.get(`${AppSettings.apiUrl}/Grills`);
    }

    getClientGrills(clientId){
        return this.http.get(`${AppSettings.apiUrl}/Clients/${clientId}/grills`);
    }
}