import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  page = 1;
  pageSize = 10;
  orderKey;
  orderDirection;

  reviews$: BehaviorSubject<any> = this.ds.reviewList;

  constructor(private ds: DataService) {
    this.ds.readDocument('reviews')
  }

  ngOnInit() {
  }

  onDelete(id: string): void {
    this.ds.deleteDocument('reviews', id)
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