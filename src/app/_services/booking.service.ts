import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppSettings} from '../config';

@Injectable({ providedIn: 'root' })
export class BookingService {
    constructor(private http: HttpClient) { }
    create(bookingInfo) {
        return this.http.post(`${AppSettings.apiUrl}/Bookings/createReservation`, bookingInfo);
    }
}