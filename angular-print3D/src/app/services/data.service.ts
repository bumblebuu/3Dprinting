import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  productList: BehaviorSubject<any> = new BehaviorSubject([]);
  product: BehaviorSubject<any> = new BehaviorSubject([]);
  orderList: BehaviorSubject<any> = new BehaviorSubject([]);
  order: BehaviorSubject<any> = new BehaviorSubject([]);
  reviewList: BehaviorSubject<any> = new BehaviorSubject([]);

  apiURL: string = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  createDocument(collectionName: string, data: Object): Observable<any> {
    return this.http.post(`${this.apiURL}/${collectionName}/add`, data);
  }

  readDocument(collectionName: string, query?: any) {
    if (query) {
      this.http.get(`${this.apiURL}/${collectionName}/${query}`).forEach(
        data => {
          if (collectionName == 'products') {
            this.product.next(data)
          } else if (collectionName == 'orders') {
            this.order.next(data)
          }
        }
      )
    }
    this.http.get(`${this.apiURL}/${collectionName}`).forEach(
      data => {
        if (collectionName == 'products') {
          this.productList.next(data)
        } else if (collectionName == 'orders') {
          this.orderList.next(data)
        }
        if (collectionName == 'reviews') {
          this.reviewList.next(data)
        }
      }
    )
  }

  readActiveProducts(collectionName: string) {
    this.http.get(`${this.apiURL}/${collectionName}/active/ones`).forEach(
      data => this.productList.next(data)
    )
  }

  updateDocument(collectionName: string, query: any, data: Object): Observable<any> {
    return this.http.put(`${this.apiURL}/${collectionName}/update/${query}`, data);
  }

  deleteDocument(collectionName: string, query: any): void {
    this.http.delete(`${this.apiURL}/${collectionName}/delete/${query}`).forEach(
      done => this.readDocument(collectionName)
    );

  }
}
