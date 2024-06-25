import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private baseUrl = 'http://localhost:3000/bookings'; // Replace with your API base URL
  private token = localStorage.getItem('token')
  private userid = localStorage.getItem('userid')

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) { }

  getToken(): string {
    return this.document?.defaultView?.localStorage?.getItem('token') as string;
  }

  // POST request to create a booking
  createBooking(tourId: string): Observable<any> {
    const url = `${this.baseUrl}/${this.userid}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(url, { tourId }, { headers });
  }

  getAllBookings(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  updateBooking(id: string, status: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(`${this.baseUrl}/${id}`, { status }, { headers });
  }

  // GET request to fetch bookings
  getBookings() {
    const url = `${this.baseUrl}/${this.userid}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(url, { headers });
  }
}
