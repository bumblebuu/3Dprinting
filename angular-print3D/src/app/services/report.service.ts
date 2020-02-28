import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  apiURL = 'http://localhost:3000/api'
  constructor(private http: HttpClient) { }

  readOrderReports(query?: string): Observable<any> {
    if (query) {
      return this.http.get(`${this.apiURL}/reports/orders/${query}`)
    }
    return this.http.get(`${this.apiURL}/reports/orders`)
  }
  readProductReports(query?: string): Observable<any> {
    if (query) {
      return this.http.get(`${this.apiURL}/reports/products/${query}`)
    }
    return this.http.get(`${this.apiURL}/reports/products`)
  }
}