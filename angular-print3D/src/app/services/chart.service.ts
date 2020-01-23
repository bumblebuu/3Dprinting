import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  url: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  readData(collectionName: string, query?: any): Observable<any> {
    if (query) {
      return this.http.get(`${this.url}/${collectionName}/${query}`)
    }
    return this.http.get(`${this.url}/${collectionName}`)
  }

  // readProducstOrderesByCategory(): Observable<any> {
  //   return this.http.get(`${this.url}/orders/productsbycategory`)
  // }
}
