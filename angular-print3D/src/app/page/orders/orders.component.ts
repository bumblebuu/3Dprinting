import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders$: BehaviorSubject<any> = this.ds.orderList;
  orderKey: string = '';
  orderDirection: number = 1;
  changeCounter: number = 0;

  constructor(private ds: DataService) {
    this.ds.readDocument('orders')
  }

  ngOnInit() {
  }

  onDelete(id: string): void {
    this.ds.deleteDocument('orders', id)
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
