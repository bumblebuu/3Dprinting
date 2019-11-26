import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {
  order$: BehaviorSubject<any> = this.ds.order;
  order: Order;

  constructor(private ds: DataService, private ar: ActivatedRoute, private router: Router) {
    this.ar.params.forEach(params => {
      this.ds.readDocument('orders', params.id)
    })
    this.order$.subscribe(
      data => {
        this.order = data
      }
    )
  }

  ngOnInit() {
  }

  onUpdate() {
    this.ds.updateDocument('orders', this.order._id, this.order).subscribe(
      () => this.router.navigate(['/orders'])
    )
  }
}
