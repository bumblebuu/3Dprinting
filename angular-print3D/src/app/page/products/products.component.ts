import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: BehaviorSubject<any> = this.ds.productList;
  constructor(private ds: DataService) {
    this.ds.readDocument('products')
  }

  ngOnInit() {
  }


}
