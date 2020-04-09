import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { BehaviorSubject } from "rxjs";
declare let $: any;

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit {
  page = 1;
  pageSize = 10;
  orders$: BehaviorSubject<any> = this.ds.orderList;
  orderKey: string = "";
  orderDirection: number = 1;
  changeCounter: number = 0;

  constructor(private ds: DataService) {
    this.ds.readDocument("orders");
  }

  ngOnInit() {}

  onDeleteModal(id: string) {
    $(`#${id}`).modal("show");
  }

  onDelete(id: string, user): void {
    this.ds.createDocument("notifications", {
      role: "admin",
      notification: "Unfortunately, your order has been cancelled",
      subject: "orders",
      to: user,
    }).subscribe((data)=>console.log(data));
    this.ds
      .updateDocument("orders", id, { status: "cancelled" })
      .subscribe(() => this.ds.readDocument("orders"));
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
