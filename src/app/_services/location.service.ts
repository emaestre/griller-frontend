import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AppSettings} from '../config';

@Injectable({ providedIn: 'root' })
export class LocationService {
    constructor(private http: HttpClient) { }

    getLocations(address){
        const httpOptions = {
            headers: new HttpHeaders({ 
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
              'Access-Control-Allow-Methods': 'GET'
            })
          };

        return this.http.get(`${AppSettings.openCageUrl}`, { 
            headers: httpOptions.headers,
            params: {
                q: address,
                key: AppSettings.openCageKey
            }
        });
    }
}