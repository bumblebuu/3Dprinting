import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-reports',
  templateUrl: './order-reports.component.html',
  styleUrls: ['./order-reports.component.css']
})
export class OrderReportsComponent implements OnInit {
  orders$: Observable<any> = this.rs.readOrderReports();
  dates$: Observable<any> = this.rs.readOrderReports('insdate');
  stats$: Observable<any> = this.rs.readOrderReports('status');

  page = 1;
  pageSize = 10;

  sumOrderValue = 0;
  sumOrders = 0;
  orderKey = '';
  orderDirection = 1;
  dates = new Set()

  constructor(private rs: ReportService) {
    this.dates$.subscribe(data => {
      data.forEach(el => {
        let date = el.split('-')
        this.dates.add(date[0] + '-' + date[1])
      })
    })
  }
  ngOnInit() {
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
