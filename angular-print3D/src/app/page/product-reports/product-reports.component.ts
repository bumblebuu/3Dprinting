import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-reports',
  templateUrl: './product-reports.component.html',
  styleUrls: ['./product-reports.component.css']
})
export class ProductReportsComponent implements OnInit {
  orders$: Observable<any> = this.rs.readProductReports()
  products$: Observable<any> = this.rs.readProductReports('products')
  dates$: Observable<any> = this.rs.readProductReports('insdate');
  dates = new Set;

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

}
