import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  page = 1;
  pageSize = 10;
  previousPage: any;
  products$: BehaviorSubject<any> = this.ds.productList;
  orderKey: string = '';
  orderDirection: number = 1;
  changeCounter: number = 0;

  constructor(private ds: DataService) {
    this.ds.readActiveProducts('products');
  }

  ngOnInit() { }

  onDelete(seo: string): void {
    this.ds.updateDocument('products', seo, { isactive: 0 }).subscribe(
      () => this.ds.readActiveProducts('products'),
    )
  }

  showAll(): void {
    this.ds.readDocument('products');
  }

  setOrderBy(key: string): void {
    if (key === this.orderKey) {
      this.orderDirection = this.orderDirection === 1 ? -1 : 1;
    } else {
      this.orderDirection = 1;
    }
    this.orderKey = key;
  }
}
