import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private baseUrl = 'http://localhost:3000/tours';

  constructor(private http: HttpClient) {}

  getAllTours(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getTourById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createTour(tourData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.baseUrl}/${localStorage.getItem('userid')}`, tourData, { headers });
  }

  updateTour(tourId: string, tourData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put(`${this.baseUrl}/${localStorage.getItem('userid')}/${tourId}`, tourData, { headers });
  }

  deleteTour(tourId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`${this.baseUrl}/${localStorage.getItem('userid')}/${tourId}`, { headers });
  }
}