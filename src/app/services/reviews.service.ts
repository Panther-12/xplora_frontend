import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = 'http://localhost:3000/reviews';

  constructor(private http: HttpClient) { }

  createReview(tourId: string, rating: number, comment: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
    const userid = localStorage.getItem('userid');
    return this.http.post<any>(`${this.apiUrl}/${userid}`, { tourId, rating, comment }, { headers });
  }

  getReviews(tourId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<any>(`${this.apiUrl}/${tourId}`, { headers });
  }
}
